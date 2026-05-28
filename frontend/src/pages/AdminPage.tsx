import { useState } from "react";
import { ArrowRight, Code, LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WriteBlog from "../components/WriteBlog";
import ApiDocs from "../components/ApiDocs";

type AdminTab = "write" | "api";

export default function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>("write");

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Sticky top bar */}
      <div className="border-b border-white/[0.05] sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Left — back */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-[#555] hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span className="text-sm hidden sm:inline">Portfolio</span>
          </button>

          {/* Center — tab switcher */}
          <div className="flex items-center bg-[#0f0f0f] border border-white/[0.06] rounded-lg p-0.5">
            <button
              onClick={() => setTab("write")}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                tab === "write" ? "bg-[#7B5CF6] text-white" : "text-[#555] hover:text-white"
              }`}
            >
              <Pencil className="w-3 h-3" />
              Write
            </button>
            <button
              onClick={() => setTab("api")}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                tab === "api" ? "bg-[#7B5CF6] text-white" : "text-[#555] hover:text-white"
              }`}
            >
              <Code className="w-3 h-3" />
              API
            </button>
          </div>

          {/* Right — logout */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-[#555] hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {tab === "write" ? <WriteBlog /> : <ApiDocs />}
    </div>
  );
}
