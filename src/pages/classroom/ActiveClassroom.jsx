import { useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  StickyNote,
  Bot,
  MonitorPlay,
  Send,
  Bold,
  Italic,
  List,
} from "lucide-react";

export default function ActiveClassroom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("notes");
  const [noteContent, setNoteContent] = useState(
    "# Session Notes\n\nStart typing your notes here...\n\n- Topic 1\n- Topic 2\n- Key concepts",
  );
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI study assistant. Ask me anything about your current topic.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [splitPos, setSplitPos] = useState(55);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);
  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    if (pct > 20 && pct < 80) setSplitPos(pct);
  }, []);
  const onMouseUp = useCallback(() => {
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((p) => [
      ...p,
      { role: "user", content: chatInput },
      {
        role: "assistant",
        content:
          "That's a great question! This is a placeholder response. AI integration coming soon.",
      },
    ]);
    setChatInput("");
  };

  const tabs = [
    { key: "notes", icon: StickyNote, label: "Notes" },
    { key: "ai", icon: Bot, label: "AI Chat" },
    { key: "video", icon: MonitorPlay, label: "Video" },
  ];

  return (
    <div
      className="fixed inset-0 bg-[#090d17] text-slate-200 flex flex-col z-50"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 h-[56px] panel-dark flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/classroom")}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-[13px] font-medium text-slate-200">
            Classroom - {id}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                activeTab === t.key
                  ? "bg-[#263c63] text-[#d8e6ff]"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
              }`}
            >
              <t.icon size={13} /> {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Split content */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left — Notes */}
        <div
          className="flex flex-col overflow-hidden panel-dark"
          style={{ width: `${splitPos}%` }}
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Notes
            </span>
            <div className="ml-auto flex items-center gap-0.5">
              {[Bold, Italic, List].map((Icon, i) => (
                <button
                  key={i}
                  className="p-1 rounded text-slate-600 hover:text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="flex-1 bg-transparent p-4 text-[13px] text-slate-200 resize-none focus:outline-none leading-relaxed font-mono placeholder:text-slate-600"
            placeholder="Start typing..."
          />
        </div>

        <div className="resize-handle" onMouseDown={onMouseDown} />

        {/* Right — AI or Video */}
        <div className="flex-1 flex flex-col overflow-hidden panel-dark">
          {activeTab !== "video" ? (
            <>
              <div className="px-4 py-2 border-b border-slate-800">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  AI Assistant
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-xl text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#284677] text-white rounded-br-sm"
                          : "bg-slate-900 text-slate-300 border border-slate-700 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-800">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendChat()}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent text-[13px] text-slate-200 focus:outline-none placeholder:text-slate-600"
                  />
                  <button
                    onClick={sendChat}
                    className="p-1 rounded text-[#9ec0ff] hover:bg-[#294677]/50 transition cursor-pointer"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center space-y-3">
                <MonitorPlay size={28} className="text-slate-700 mx-auto" />
                <p className="text-sm text-slate-500">
                  Paste a YouTube URL to embed
                </p>
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  className="px-3 py-2 text-[13px] bg-slate-900 border border-slate-700 rounded-lg w-72 text-slate-300 focus:outline-none focus:border-[#6f92d7] placeholder:text-slate-600"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
