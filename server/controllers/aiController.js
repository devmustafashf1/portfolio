import { callDeepSeek } from "../config/deepseek.js";
import { supabase } from "../config/supabaseClient.js";

function stripFences(text) {
  return text
    .replace(/^```(?:html|markdown|json|text)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function htmlToPlainText(content) {
  return content
    .replace(/<img[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Reader-facing "explain this post" cache. Public endpoint, no auth — this
// keeps repeat visits to the same post from re-hitting the DeepSeek API.
// In-memory is fine here: it's a personal blog, low post volume, and a cold
// cache after a server restart just costs one extra generation per post.
const explainCache = new Map();

// Improve a single, user-selected passage of text. Operates purely on plain
// text the client already extracted from its selection — never touches images,
// since the client guarantees the selection never crosses an image node.
export const improveText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }
    if (text.length > 4000) {
      return res.status(400).json({ error: "Selection is too long — select a shorter passage" });
    }

    const improved = await callDeepSeek({
      system:
        "You are a precise writing editor for a personal software-developer's blog. Improve the clarity, flow, grammar, and concision of the text the user gives you. Keep the same meaning, tone, and language. Do not add new facts, opinions, or content that was not implied by the original. Return ONLY the improved plain text — no quotes, no markdown code fences, no explanation.",
      user: text,
      temperature: 0.5,
    });

    return res.json({ text: stripFences(improved) });
  } catch (err) {
    console.error("AI improveText error:", err);
    return res.status(err.status || 500).json({ error: err.message || "Failed to improve text" });
  }
};

export const suggestTitle = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }

    const title = await callDeepSeek({
      system:
        "You write short, compelling titles for blog posts on a software developer's personal portfolio site. Given the body text of a post, respond with ONE title only — no surrounding quotes, no trailing punctuation, no explanation, under 70 characters.",
      user: text.slice(0, 6000),
      temperature: 0.7,
    });

    return res.json({ title: stripFences(title).replace(/^["']|["']$/g, "") });
  } catch (err) {
    console.error("AI suggestTitle error:", err);
    return res.status(err.status || 500).json({ error: err.message || "Failed to suggest a title" });
  }
};

export const suggestExcerpt = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }

    const excerpt = await callDeepSeek({
      system:
        "You write short teaser excerpts shown on a blog listing page, for a software developer's personal portfolio site. Given the body text of a post, respond with ONE excerpt only — 1 to 2 sentences, under 200 characters, no surrounding quotes, no explanation. It should summarize what the post covers and make someone want to click in, without repeating the title verbatim.",
      user: text.slice(0, 6000),
      temperature: 0.6,
    });

    return res.json({ excerpt: stripFences(excerpt).replace(/^["']|["']$/g, "") });
  } catch (err) {
    console.error("AI suggestExcerpt error:", err);
    return res.status(err.status || 500).json({ error: err.message || "Failed to suggest an excerpt" });
  }
};

export const suggestTags = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }

    const raw = await callDeepSeek({
      system:
        'You analyze blog post content and suggest tags for categorization. Respond with a JSON object of the exact shape {"tags": ["tag1", "tag2", ...]}. Produce 3 to 6 short, lowercase, relevant tags (single words or short phrases, e.g. "react", "web performance"). No explanation, JSON only.',
      user: text.slice(0, 6000),
      json: true,
      temperature: 0.4,
    });

    const parsed = JSON.parse(raw);
    const tags = Array.isArray(parsed.tags) ? parsed.tags.filter(Boolean).slice(0, 6) : [];
    if (!tags.length) {
      const err = new Error("AI did not return any tags");
      err.status = 502;
      throw err;
    }

    return res.json({ tags: tags.join(", ") });
  } catch (err) {
    console.error("AI suggestTags error:", err);
    return res.status(err.status || 500).json({ error: err.message || "Failed to suggest tags" });
  }
};

// Restructures plain-text segments (already extracted client-side, with every
// image node excluded and its position remembered) into HTML with headings.
// The response array must match the input array 1:1 so the client can splice
// the results back between the untouched image nodes.
export const structureContent = async (req, res) => {
  try {
    const { segments } = req.body;
    if (!Array.isArray(segments) || segments.length === 0) {
      return res.status(400).json({ error: "segments array is required" });
    }
    if (segments.length > 20) {
      return res.status(400).json({ error: "Too many sections to restructure at once" });
    }

    const raw = await callDeepSeek({
      system:
        'You restructure blog post text into clean, well-organized HTML for a rich text editor. You will receive a JSON object {"segments": ["...", "...", ...]} — each string is one section of plain text from a blog post, in order. For EACH segment independently: add appropriate section heading(s) if the segment covers more than one idea (use <h2> and <h3> only, never <h1>), break it into clear paragraphs (<p>), and lightly improve flow — WITHOUT changing meaning, WITHOUT inventing new facts, and WITHOUT merging content across different segments. If a segment is short and does not need a heading, just return it as clean paragraph(s). Respond with ONLY a JSON object of the exact shape {"segments": ["<html>", "<html>", ...]} with EXACTLY the same number of items, in the same order, as the input. Allowed tags only: h2, h3, p, ul, ol, li, blockquote, strong, em. No markdown, no code fences, no explanation.',
      user: JSON.stringify({ segments }),
      json: true,
      temperature: 0.5,
    });

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.segments) || parsed.segments.length !== segments.length) {
      const err = new Error("AI response did not match the expected structure — try again");
      err.status = 502;
      throw err;
    }

    return res.json({ segments: parsed.segments });
  } catch (err) {
    console.error("AI structureContent error:", err);
    return res.status(err.status || 500).json({ error: err.message || "Failed to restructure content" });
  }
};

// Reader-facing "explain this post" — public, no auth. Fetches the post's own
// content server-side by id (never trusts client-supplied text, so a caller
// can't spend API budget explaining arbitrary text), and caches the result
// per post so repeat readers don't trigger new DeepSeek calls.
export const explainPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (explainCache.has(id)) {
      return res.json({ explanation: explainCache.get(id) });
    }

    const { data: blog, error } = await supabase
      .from("blogs")
      .select("title, excerpt, content")
      .eq("id", id)
      .single();

    if (error || !blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const plainText = htmlToPlainText(blog.content).slice(0, 8000);
    if (!plainText) {
      return res.status(400).json({ error: "This post has no readable text to explain" });
    }

    const explanation = await callDeepSeek({
      system:
        "You are a warm, encouraging teacher helping someone quickly understand a blog post on a software developer's personal site. Read the article text you're given and explain it simply and clearly, as if to a curious beginner — use everyday analogies for technical concepts instead of jargon, and keep it friendly and concise (roughly 150-300 words total). Structure your response as: a one-line 'what this post is about', then a few key points explained simply, then a short 'why it matters' takeaway. Respond with ONLY clean HTML using exclusively these tags: h4, p, ul, li, strong, em. No markdown, no code fences, no preamble, no mention of these instructions.",
      user: `Title: ${blog.title}\n\n${plainText}`,
      temperature: 0.6,
    });

    const html = stripFences(explanation);
    explainCache.set(id, html);

    return res.json({ explanation: html });
  } catch (err) {
    console.error("AI explainPost error:", err);
    return res.status(err.status || 500).json({ error: err.message || "Failed to explain this post" });
  }
};
