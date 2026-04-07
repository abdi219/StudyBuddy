import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, StickyNote, Bot, MonitorPlay, Send,
  Bold, Italic, List, Pencil, Code2, ChevronDown,
  Eraser, Circle, Square, Minus, Undo2, Trash2,
  Play, Type, Download, Palette, X, ChevronUp,
  Calculator, FileText, Image,
} from "lucide-react";

/* ═══════════════════════════════════════
   ACTIVE CLASSROOM with DRAWER
   ═══════════════════════════════════════ */
export default function ActiveClassroom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("notes");

  const tabs = [
    { key: "youtube", icon: MonitorPlay, label: "YouTube", color: "#d14343" },
    { key: "notes", icon: StickyNote, label: "Notes", color: "#5b5bd6" },
    { key: "draw", icon: Pencil, label: "Draw", color: "#2d9d78" },
    { key: "ai", icon: Bot, label: "AI Chat", color: "#3e8ed0" },
    { key: "code", icon: Code2, label: "Code", color: "#e5a31d" },
    { key: "calc", icon: Calculator, label: "Quick Calc", color: "#9333ea" },
    { key: "flashcards", icon: FileText, label: "Flashcards", color: "#ec4899" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#0c1120", color: "#e2e8f0",
      display: "flex", flexDirection: "column", zIndex: 50,
    }}>
      {/* ── Top Bar ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 52,
        background: "rgba(12, 17, 32, 0.95)", borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
        backdropFilter: "blur(12px)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/classroom")} style={{
            padding: 6, borderRadius: 8, background: "none", border: "none",
            color: "#94a3b8", cursor: "pointer", display: "flex",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "none"; }}
          >
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>
            📚 Classroom — {id}
          </span>
        </div>

        {/* ── DRAWER TOGGLE ── */}
        <button onClick={() => setDrawerOpen(!drawerOpen)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 20,
          background: drawerOpen ? "rgba(91, 91, 214, 0.2)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${drawerOpen ? "rgba(91, 91, 214, 0.4)" : "rgba(255,255,255,0.1)"}`,
          color: drawerOpen ? "#a5a5f0" : "#94a3b8",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          transition: "all 0.25s ease",
        }}>
          Toolbar {drawerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <div style={{ width: 80 }} /> {/* spacer */}
      </header>

      {/* ── DRAWER (Tab Bar) ── */}
      <div style={{
        overflow: "hidden",
        maxHeight: drawerOpen ? 64 : 0,
        transition: "max-height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        background: "rgba(12, 17, 32, 0.98)",
        borderBottom: drawerOpen ? "1px solid rgba(148, 163, 184, 0.1)" : "none",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 4, padding: "12px 16px",
        }}>
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 12,
              fontSize: 12, fontWeight: 600,
              background: activeTab === t.key ? `${t.color}20` : "transparent",
              color: activeTab === t.key ? t.color : "#64748b",
              border: activeTab === t.key ? `1px solid ${t.color}40` : "1px solid transparent",
              cursor: "pointer", transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { if (activeTab !== t.key) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94a3b8"; }}}
              onMouseLeave={(e) => { if (activeTab !== t.key) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── WORKSPACE ── */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {activeTab === "notes" && <NotesPanel />}
        {activeTab === "ai" && <AIPanel />}
        {activeTab === "youtube" && <YouTubePanel />}
        {activeTab === "draw" && <DrawPanel />}
        {activeTab === "code" && <CodePanel />}
        {activeTab === "calc" && <QuickCalcPanel />}
        {activeTab === "flashcards" && <FlashcardsPanel />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   NOTES PANEL
   ═══════════════════════════════════════ */
function NotesPanel() {
  const [content, setContent] = useState("# Session Notes\n\nStart typing your notes here...\n\n- Topic 1\n- Topic 2\n- Key concepts");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderBottom: "1px solid rgba(148,163,184,0.1)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Notes</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {[Bold, Italic, List].map((Icon, i) => (
            <button key={i} style={{
              padding: 4, borderRadius: 6, background: "none", border: "none",
              color: "#475569", cursor: "pointer", display: "flex",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "none"; }}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{
        flex: 1, background: "transparent", padding: 20, fontSize: 14,
        color: "#e2e8f0", resize: "none", border: "none", outline: "none",
        lineHeight: 1.8, fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }} placeholder="Start writing..." />
    </div>
  );
}

/* ═══════════════════════════════════════
   AI PANEL
   ═══════════════════════════════════════ */
function AIPanel() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI study assistant. Ask me anything about your current topic 🎓" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p,
      { role: "user", content: input },
      { role: "assistant", content: "That's a great question! AI integration coming soon. For now, this is a placeholder response. 🤖" },
    ]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>AI Assistant</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "75%", padding: "10px 14px", borderRadius: 14,
              fontSize: 13, lineHeight: 1.6,
              background: msg.role === "user" ? "rgba(91, 91, 214, 0.25)" : "rgba(30, 41, 59, 0.8)",
              color: msg.role === "user" ? "#c4b5fd" : "#cbd5e1",
              border: msg.role === "user" ? "none" : "1px solid rgba(148,163,184,0.15)",
              borderBottomRightRadius: msg.role === "user" ? 4 : 14,
              borderBottomLeftRadius: msg.role === "user" ? 14 : 4,
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: 12, borderTop: "1px solid rgba(148,163,184,0.1)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(30, 41, 59, 0.6)", border: "1px solid rgba(148,163,184,0.15)",
          borderRadius: 12, padding: "8px 14px",
        }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 13, color: "#e2e8f0",
            }} />
          <button onClick={send} style={{
            padding: 6, borderRadius: 8, background: "none", border: "none",
            color: "#818cf8", cursor: "pointer", display: "flex",
          }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   YOUTUBE PANEL
   ═══════════════════════════════════════ */
function YouTubePanel() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const loadVideo = () => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    if (match) setEmbedUrl(`https://www.youtube.com/embed/${match[1]}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>
      <div style={{
        padding: "16px 20px", display: "flex", gap: 8, alignItems: "center",
        width: "100%", maxWidth: 600, margin: "0 auto",
      }}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadVideo()}
          placeholder="Paste a YouTube URL..."
          style={{
            flex: 1, padding: "10px 14px", fontSize: 13,
            background: "rgba(30, 41, 59, 0.6)", border: "1px solid rgba(148,163,184,0.15)",
            borderRadius: 10, color: "#e2e8f0", outline: "none",
          }} />
        <button onClick={loadVideo} style={{
          padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: "#d14343", color: "#fff", border: "none", cursor: "pointer",
        }}>Load</button>
      </div>
      <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {embedUrl ? (
          <iframe src={embedUrl} style={{
            width: "90%", maxWidth: 800, height: "80%",
            border: "none", borderRadius: 12,
          }} allowFullScreen />
        ) : (
          <div style={{ textAlign: "center" }}>
            <MonitorPlay size={40} style={{ color: "#334155", marginBottom: 12 }} />
            <p style={{ fontSize: 14, color: "#64748b" }}>Paste a YouTube URL above to watch</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   DRAW PANEL — Canvas with shapes
   ═══════════════════════════════════════ */
function DrawPanel() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen"); // pen, eraser, line, rect, circle
  const [color, setColor] = useState("#e2e8f0");
  const [lineWidth, setLineWidth] = useState(2);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [history, setHistory] = useState([]);

  const getCtx = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = getCtx();
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (canvas) setHistory((h) => [...h.slice(-20), canvas.toDataURL()]);
  };

  const undo = () => {
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    const img = new window.Image();
    img.onload = () => { getCtx()?.drawImage(img, 0, 0); };
    img.src = prev;
    setHistory((h) => h.slice(0, -1));
  };

  const clearCanvas = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (ctx && canvas) {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e) => {
    const pos = getPos(e);
    setDrawing(true);
    setStartPos(pos);
    if (tool === "pen" || tool === "eraser") {
      const ctx = getCtx();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const onMove = (e) => {
    if (!drawing) return;
    const pos = getPos(e);
    if (tool === "pen" || tool === "eraser") {
      const ctx = getCtx();
      ctx.lineWidth = tool === "eraser" ? lineWidth * 4 : lineWidth;
      ctx.strokeStyle = tool === "eraser" ? "#0f172a" : color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const onUp = (e) => {
    if (!drawing) return;
    const pos = getPos(e);
    const ctx = getCtx();
    if (ctx && startPos && (tool === "line" || tool === "rect" || tool === "circle")) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (tool === "rect") {
        ctx.strokeRect(startPos.x, startPos.y, pos.x - startPos.x, pos.y - startPos.y);
      } else if (tool === "circle") {
        const rx = Math.abs(pos.x - startPos.x) / 2;
        const ry = Math.abs(pos.y - startPos.y) / 2;
        const cx = startPos.x + (pos.x - startPos.x) / 2;
        const cy = startPos.y + (pos.y - startPos.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    setDrawing(false);
    saveState();
  };

  const drawTools = [
    { key: "pen", icon: Pencil, label: "Pen" },
    { key: "eraser", icon: Eraser, label: "Eraser" },
    { key: "line", icon: Minus, label: "Line" },
    { key: "rect", icon: Square, label: "Rectangle" },
    { key: "circle", icon: Circle, label: "Circle" },
  ];

  const colors = ["#e2e8f0", "#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa", "#a78bfa", "#f472b6"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderBottom: "1px solid rgba(148,163,184,0.1)",
        flexWrap: "wrap",
      }}>
        {drawTools.map((t) => (
          <button key={t.key} onClick={() => setTool(t.key)} title={t.label} style={{
            padding: 6, borderRadius: 8,
            background: tool === t.key ? "rgba(91,91,214,0.2)" : "transparent",
            border: tool === t.key ? "1px solid rgba(91,91,214,0.4)" : "1px solid transparent",
            color: tool === t.key ? "#818cf8" : "#64748b",
            cursor: "pointer", display: "flex",
          }}>
            <t.icon size={16} />
          </button>
        ))}
        <div style={{ width: 1, height: 20, background: "rgba(148,163,184,0.15)", margin: "0 4px" }} />
        {colors.map((c) => (
          <div key={c} onClick={() => setColor(c)} style={{
            width: 20, height: 20, borderRadius: "50%", background: c, cursor: "pointer",
            border: color === c ? "2px solid #fff" : "2px solid transparent",
            transition: "all 0.15s ease",
          }} />
        ))}
        <div style={{ width: 1, height: 20, background: "rgba(148,163,184,0.15)", margin: "0 4px" }} />
        <select value={lineWidth} onChange={(e) => setLineWidth(+e.target.value)} style={{
          padding: "4px 8px", fontSize: 12, background: "rgba(30,41,59,0.6)",
          border: "1px solid rgba(148,163,184,0.15)", borderRadius: 6, color: "#94a3b8",
        }}>
          {[1, 2, 3, 5, 8].map((w) => <option key={w} value={w}>{w}px</option>)}
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          <button onClick={undo} title="Undo" style={{
            padding: 6, borderRadius: 8, background: "none", border: "none",
            color: "#64748b", cursor: "pointer", display: "flex",
          }}><Undo2 size={15} /></button>
          <button onClick={clearCanvas} title="Clear" style={{
            padding: 6, borderRadius: 8, background: "none", border: "none",
            color: "#64748b", cursor: "pointer", display: "flex",
          }}><Trash2 size={15} /></button>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ flex: 1, cursor: "crosshair", display: "block" }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} />
    </div>
  );
}

/* ═══════════════════════════════════════
   CODE PANEL — JS Editor + Runner
   ═══════════════════════════════════════ */
function CodePanel() {
  const [code, setCode] = useState('// Write JavaScript here\nconsole.log("Hello from Abdi\'s Library! 🎓");\n\n// Try some math\nconst gpa = (3.5 + 4.0 + 3.7) / 3;\nconsole.log("Average GPA:", gpa.toFixed(2));\n');
  const [output, setOutput] = useState("");

  const runCode = () => {
    const logs = [];
    const origLog = console.log;
    const origError = console.error;
    console.log = (...args) => logs.push(args.map(String).join(" "));
    console.error = (...args) => logs.push("ERROR: " + args.map(String).join(" "));
    try {
      const result = new Function(code)();
      if (result !== undefined) logs.push("→ " + String(result));
    } catch (err) {
      logs.push("❌ " + err.message);
    }
    console.log = origLog;
    console.error = origError;
    setOutput(logs.join("\n"));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderBottom: "1px solid rgba(148,163,184,0.1)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>JavaScript Editor</span>
        <button onClick={runCode} style={{
          marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
          background: "#2d9d78", color: "#fff", border: "none", cursor: "pointer",
        }}>
          <Play size={13} /> Run
        </button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{
          flex: 1, background: "rgba(15, 23, 42, 0.9)", padding: 16, fontSize: 13,
          color: "#e2e8f0", resize: "none", border: "none", outline: "none",
          lineHeight: 1.7, fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          borderRight: "1px solid rgba(148,163,184,0.1)",
        }} spellCheck={false} />
        <div style={{
          flex: 1, background: "rgba(15, 23, 42, 0.6)", padding: 16,
          fontSize: 13, color: "#94a3b8", overflow: "auto",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineHeight: 1.7, whiteSpace: "pre-wrap",
        }}>
          {output || "// Output will appear here after running your code"}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   QUICK CALC PANEL
   ═══════════════════════════════════════ */
function QuickCalcPanel() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const calculate = () => {
    try {
      const res = new Function("return " + expression)();
      setResult(res);
      setHistory((h) => [...h, { expr: expression, result: res }]);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", padding: 32 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 16, textAlign: "center" }}>🔢 Quick Calculator</h3>
        <div style={{
          background: "rgba(30,41,59,0.6)", borderRadius: 12,
          border: "1px solid rgba(148,163,184,0.15)", padding: 20, marginBottom: 16,
        }}>
          <input type="text" value={expression} onChange={(e) => setExpression(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            placeholder="Type expression: 25 * 4 + 10"
            style={{
              width: "100%", padding: "12px 16px", fontSize: 18, textAlign: "right",
              background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.15)",
              borderRadius: 10, color: "#e2e8f0", outline: "none",
              fontFamily: "'Space Grotesk', sans-serif",
            }} />
          {result !== null && (
            <div style={{
              textAlign: "right", fontSize: 32, fontWeight: 800,
              color: "#5b5bd6", marginTop: 12, fontFamily: "'Space Grotesk', sans-serif",
            }}>
              = {String(result)}
            </div>
          )}
        </div>
        <button onClick={calculate} style={{
          width: "100%", padding: "12px", borderRadius: 10,
          fontSize: 14, fontWeight: 600, background: "#5b5bd6",
          color: "#fff", border: "none", cursor: "pointer",
        }}>Calculate</button>

        {history.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 8 }}>History</p>
            {history.slice(-5).reverse().map((h, i) => (
              <div key={i} style={{
                padding: "8px 12px", fontSize: 13, color: "#94a3b8",
                borderBottom: "1px solid rgba(148,163,184,0.08)",
                display: "flex", justifyContent: "space-between",
              }}>
                <span>{h.expr}</span>
                <span style={{ color: "#5b5bd6", fontWeight: 600 }}>= {String(h.result)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   FLASHCARDS PANEL
   ═══════════════════════════════════════ */
function FlashcardsPanel() {
  const [cards, setCards] = useState([
    { id: 1, front: "What is O(n log n)?", back: "Time complexity of efficient sorting algorithms like MergeSort and QuickSort" },
    { id: 2, front: "What is polymorphism?", back: "The ability of objects to take on multiple forms — method overriding and overloading in OOP" },
    { id: 3, front: "What is normalization?", back: "Organizing a database to reduce redundancy and improve data integrity (1NF → 2NF → 3NF)" },
  ]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const card = cards[idx];
  const next = () => { setIdx((i) => (i + 1) % cards.length); setFlipped(false); };
  const prev = () => { setIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); };
  const addCard = () => {
    if (!newFront.trim() || !newBack.trim()) return;
    setCards([...cards, { id: Date.now(), front: newFront, back: newBack }]);
    setNewFront(""); setNewBack(""); setShowAdd(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 32, gap: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
        Card {idx + 1} of {cards.length} — Click to flip
      </p>

      {card && (
        <div onClick={() => setFlipped(!flipped)} style={{
          width: 400, minHeight: 220, borderRadius: 16,
          background: flipped ? "rgba(91, 91, 214, 0.15)" : "rgba(30, 41, 59, 0.8)",
          border: `1px solid ${flipped ? "rgba(91,91,214,0.3)" : "rgba(148,163,184,0.15)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 32, cursor: "pointer",
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: flipped ? "rotateY(5deg) scale(1.02)" : "none",
        }}>
          <p style={{
            fontSize: flipped ? 15 : 18, fontWeight: flipped ? 400 : 600,
            color: flipped ? "#c4b5fd" : "#e2e8f0", textAlign: "center",
            lineHeight: 1.7,
          }}>
            {flipped ? card.back : card.front}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={prev} style={{
          padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: "rgba(30,41,59,0.6)", color: "#94a3b8",
          border: "1px solid rgba(148,163,184,0.15)", cursor: "pointer",
        }}>← Prev</button>
        <button onClick={next} style={{
          padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: "rgba(91,91,214,0.2)", color: "#818cf8",
          border: "1px solid rgba(91,91,214,0.3)", cursor: "pointer",
        }}>Next →</button>
        <button onClick={() => setShowAdd(!showAdd)} style={{
          padding: "8px 14px", borderRadius: 10, fontSize: 13,
          background: "rgba(45,157,120,0.2)", color: "#4ade80",
          border: "1px solid rgba(45,157,120,0.3)", cursor: "pointer",
        }}>+ Add</button>
      </div>

      {showAdd && (
        <div style={{
          display: "flex", flexDirection: "column", gap: 10, width: 400,
          padding: 16, borderRadius: 12, background: "rgba(30,41,59,0.6)",
          border: "1px solid rgba(148,163,184,0.15)",
        }}>
          <input type="text" value={newFront} onChange={(e) => setNewFront(e.target.value)}
            placeholder="Question / Front" style={{
              padding: "10px 14px", fontSize: 13, background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8,
              color: "#e2e8f0", outline: "none",
            }} />
          <input type="text" value={newBack} onChange={(e) => setNewBack(e.target.value)}
            placeholder="Answer / Back" style={{
              padding: "10px 14px", fontSize: 13, background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8,
              color: "#e2e8f0", outline: "none",
            }} />
          <button onClick={addCard} style={{
            padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: "#2d9d78", color: "#fff", border: "none", cursor: "pointer",
          }}>Add Flashcard</button>
        </div>
      )}
    </div>
  );
}
