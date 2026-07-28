const API = import.meta.env.VITE_API_URL;

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "AI request failed");
  return data as T;
}

export function improveText(text: string) {
  return post<{ text: string }>("/read/blog/ai/improve", { text });
}

export function suggestTitle(text: string) {
  return post<{ title: string }>("/read/blog/ai/title", { text });
}

export function suggestExcerpt(text: string) {
  return post<{ excerpt: string }>("/read/blog/ai/excerpt", { text });
}

export function suggestTags(text: string) {
  return post<{ tags: string }>("/read/blog/ai/tags", { text });
}

export function structureSegments(segments: string[]) {
  return post<{ segments: string[] }>("/read/blog/ai/structure", { segments });
}

// Public, reader-facing — no admin token involved.
export async function explainPost(blogId: string): Promise<{ explanation: string }> {
  const res = await fetch(`${API}/read/blog/${blogId}/explain`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to explain this post");
  return data;
}
