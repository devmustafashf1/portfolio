import { useState } from "react";
import { Check, Copy, ExternalLink, Lock, BookOpen } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL as string;

type Method = "POST" | "GET";

interface Endpoint {
  method: Method;
  path: string;
  summary: string;
  auth: boolean;
  body?: Record<string, string>;
  response: string;
}

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/auth/login",
    summary: "Get a JWT token (your API key)",
    auth: false,
    body: { username: "string", password: "string" },
    response: `{ "token": "eyJ...", "user": { "username": "mustafa" } }`,
  },
  {
    method: "POST",
    path: "/read/blog",
    summary: "Create a blog post",
    auth: true,
    body: {
      title: "string  (required)",
      author: "string  (required)",
      excerpt: "string  (required)",
      content: "string  (required, markdown)",
      tags: "string  (comma-separated)",
      read_time: "number",
      pinned: "boolean",
    },
    response: `{ "message": "Blog created successfully", "blog": { "id": "...", ... } }`,
  },
  {
    method: "GET",
    path: "/read/",
    summary: "List all blog posts",
    auth: false,
    response: `[ { "id": "...", "title": "...", "excerpt": "...", ... } ]`,
  },
  {
    method: "GET",
    path: "/read/pinned",
    summary: "List pinned blog posts",
    auth: false,
    response: `[ { "id": "...", "pinned": true, ... } ]`,
  },
  {
    method: "GET",
    path: "/read/:id",
    summary: "Get a single blog post by ID",
    auth: false,
    response: `{ "id": "...", "title": "...", "content": "...", ... }`,
  },
];

const METHOD_STYLE: Record<Method, string> = {
  POST: "bg-[#7B5CF6]/15 text-[#a78bfa] border border-[#7B5CF6]/25",
  GET:  "bg-green-500/10  text-green-400  border border-green-500/20",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="text-[#444] hover:text-white transition-colors flex items-center gap-1 text-xs"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function ApiDocs() {
  const token = localStorage.getItem("adminToken") ?? "";
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const curlExample = [
    `curl -X POST ${API_BASE}/read/blog \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -H "Authorization: Bearer ${token || "<your-token>"}" \\`,
    `  -d '{`,
    `    "title": "My Post",`,
    `    "author": "Mustafa Shafique",`,
    `    "excerpt": "Short summary",`,
    `    "content": "## Hello\\n\\nWorld",`,
    `    "tags": "react, tips",`,
    `    "read_time": 3,`,
    `    "pinned": false`,
    `  }'`,
  ].join("\n");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* API Key card */}
      <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-4 h-4 text-[#7B5CF6]" />
          <h2 className="text-sm font-semibold">Your API Key (JWT)</h2>
        </div>
        <p className="text-xs text-[#555] mb-3">
          Use this token as a <code className="text-[#7B5CF6] bg-[#7B5CF6]/10 px-1 rounded">Bearer</code> token in the{" "}
          <code className="text-[#7B5CF6] bg-[#7B5CF6]/10 px-1 rounded">Authorization</code> header. Valid for 7 days — re-login to refresh.
        </p>
        {token ? (
          <div className="bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 flex items-center justify-between gap-4">
            <code className="text-xs text-[#666] font-mono truncate">{token}</code>
            <CopyButton text={token} />
          </div>
        ) : (
          <p className="text-xs text-red-400">No token found — you may not be logged in.</p>
        )}
      </div>

      {/* Endpoints */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[#555]" />
          <h2 className="text-sm font-semibold text-[#888]">Endpoints</h2>
          <span className="text-xs text-[#444] ml-auto">
            Base URL:{" "}
            <code className="text-[#666] font-mono">{API_BASE}</code>
          </span>
        </div>

        <div className="space-y-2">
          {endpoints.map((ep, i) => (
            <div
              key={i}
              className="bg-[#0f0f0f] border border-white/[0.06] rounded-xl overflow-hidden"
            >
              {/* Header row */}
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${METHOD_STYLE[ep.method]}`}>
                  {ep.method}
                </span>
                <code className="text-sm text-white font-mono flex-1">{ep.path}</code>
                {ep.auth && (
                  <span className="text-[10px] text-[#7B5CF6] bg-[#7B5CF6]/10 border border-[#7B5CF6]/20 px-2 py-0.5 rounded-full">
                    Auth required
                  </span>
                )}
                <span className="text-[#444] text-xs hidden sm:block">{ep.summary}</span>
                <span className="text-[#444] text-xs ml-2">{openIdx === i ? "▲" : "▼"}</span>
              </button>

              {/* Expanded detail */}
              {openIdx === i && (
                <div className="border-t border-white/[0.05] px-5 py-4 space-y-4">
                  <p className="text-xs text-[#666]">{ep.summary}</p>

                  {ep.body && (
                    <div>
                      <p className="text-xs text-[#555] uppercase tracking-wider mb-2">Request body</p>
                      <div className="bg-[#141414] border border-white/[0.06] rounded-xl p-4 space-y-1">
                        {Object.entries(ep.body).map(([k, v]) => (
                          <div key={k} className="flex gap-3 text-xs font-mono">
                            <span className="text-[#7B5CF6] w-28 shrink-0">{k}</span>
                            <span className="text-[#555]">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-[#555] uppercase tracking-wider mb-2">Response</p>
                    <div className="bg-[#141414] border border-white/[0.06] rounded-xl px-4 py-3 flex items-start justify-between gap-3">
                      <code className="text-xs text-[#888] font-mono break-all">{ep.response}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* cURL example */}
      <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold">cURL example — create a post</p>
          <CopyButton text={curlExample} />
        </div>
        <pre className="bg-[#141414] border border-white/[0.06] rounded-xl p-4 text-xs text-[#888] font-mono overflow-x-auto leading-relaxed whitespace-pre">
          {curlExample}
        </pre>
      </div>

      {/* Swagger link */}
      <a
        href={`${API_BASE}/api-docs`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm text-[#555] hover:text-white border border-white/[0.06] hover:border-white/[0.15] bg-[#0f0f0f] rounded-xl px-5 py-3.5 transition-all w-fit"
      >
        <ExternalLink className="w-4 h-4" />
        Open full Swagger UI
      </a>
    </div>
  );
}
