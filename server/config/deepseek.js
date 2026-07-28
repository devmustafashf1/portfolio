const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

export async function callDeepSeek({ system, user, json = false, temperature = 0.6 }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    const err = new Error("DEEPSEEK_API_KEY is not configured on the server");
    err.status = 500;
    throw err;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(json ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`DeepSeek API error (${res.status}): ${text || res.statusText}`);
      err.status = 502;
      throw err;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      const err = new Error("DeepSeek returned an empty response");
      err.status = 502;
      throw err;
    }

    return content.trim();
  } catch (err) {
    if (err.name === "AbortError") {
      const timeoutErr = new Error("DeepSeek request timed out");
      timeoutErr.status = 504;
      throw timeoutErr;
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
