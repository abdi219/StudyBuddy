import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, StickyNote, Bot, MonitorPlay, Send,
  Bold, Italic, List, Pencil, Code2,
  Eraser, Circle, Square, Minus, Undo2, Trash2,
  Play, Calculator, FileText, GripVertical,
  ChevronDown, X, Plus,
} from "lucide-react";

/* ═══════════════════════════════════════
   CLASSROOM — New warm dark theme
   + Drag-drop split screens
   + Oval compact drawer
   ═══════════════════════════════════════ */

const ALL_TABS = [
  { key: "youtube", icon: MonitorPlay, label: "YouTube" },
  { key: "notes", icon: StickyNote, label: "Notes" },
  { key: "draw", icon: Pencil, label: "Draw" },
  { key: "ai", icon: Bot, label: "AI Chat" },
  { key: "code", icon: Code2, label: "Code" },
  { key: "calc", icon: Calculator, label: "Calculator" },
  { key: "flashcards", icon: FileText, label: "Flashcards" },
];

export default function ActiveClassroom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Active panels in split view
  const [panels, setPanels] = useState(["notes", "ai"]);
  const [dragItem, setDragItem] = useState(null);

  const addPanel = (key) => {
    if (panels.includes(key)) return;
    if (panels.length >= 4) return; // max 4
    setPanels([...panels, key]);
    setDrawerOpen(false);
  };

  const removePanel = (key) => {
    if (panels.length <= 1) return;
    setPanels(panels.filter((p) => p !== key));
  };

  const replacePanel = (idx, key) => {
    const next = [...panels];
    next[idx] = key;
    setPanels(next);
    setDrawerOpen(false);
  };

  const handleDragStart = (key) => setDragItem(key);
  const handleDragEnd = () => setDragItem(null);
  const handleDrop = (idx) => {
    if (!dragItem) return;
    if (panels.includes(dragItem)) {
      // reorder
      const from = panels.indexOf(dragItem);
      const next = [...panels];
      next.splice(from, 1);
      next.splice(idx, 0, dragItem);
      setPanels(next);
    } else {
      // add or replace
      if (panels.length < 4) {
        const next = [...panels];
        next.splice(idx, 0, dragItem);
        setPanels(next);
      } else {
        replacePanel(idx, dragItem);
      }
    }
    setDragItem(null);
    setDrawerOpen(false);
  };

  const getTabInfo = (key) => ALL_TABS.find((t) => t.key === key);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#1a1e2e", color: "#d4d8e8",
      display: "flex", flexDirection: "column", zIndex: 50,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* ── Top Bar ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 48,
        background: "#1e2235", borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/classroom")} style={iconBtnStyle}>
            <ArrowLeft size={15} />
          </button>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#c8cde0" }}>
            Classroom — {id}
          </span>
        </div>

        {/* ── OVAL DRAWER TOGGLE ── */}
        <button onClick={() => setDrawerOpen(!drawerOpen)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 16px", borderRadius: 50,
          background: drawerOpen ? "rgba(99, 179, 237, 0.15)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${drawerOpen ? "rgba(99, 179, 237, 0.3)" : "rgba(255,255,255,0.08)"}`,
          color: drawerOpen ? "#63b3ed" : "#8892b0",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          transition: "all 0.25s ease",
        }}>
          <Plus size={13} /> Toolbox
          <ChevronDown size={12} style={{
            transition: "transform 0.2s ease",
            transform: drawerOpen ? "rotate(180deg)" : "none",
          }} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#667", marginRight: 4 }}>{panels.length}/4 panels</span>
        </div>
      </header>

      {/* ── DRAWER (compact oval style) ── */}
      <div style={{
        overflow: "hidden",
        maxHeight: drawerOpen ? 80 : 0,
        transition: "max-height 0.3s ease",
        background: "#1e2235",
        borderBottom: drawerOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, padding: "14px 16px",
        }}>
          {ALL_TABS.map((t) => {
            const inUse = panels.includes(t.key);
            return (
              <div
                key={t.key}
                draggable
                onDragStart={() => handleDragStart(t.key)}
                onDragEnd={handleDragEnd}
                onClick={() => !inUse && addPanel(t.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 50,
                  fontSize: 11, fontWeight: 600,
                  background: inUse ? "rgba(99, 179, 237, 0.12)" : "rgba(255,255,255,0.04)",
                  color: inUse ? "#63b3ed" : "#667a8c",
                  border: `1px solid ${inUse ? "rgba(99, 179, 237, 0.25)" : "rgba(255,255,255,0.06)"}`,
                  cursor: inUse ? "grab" : "pointer",
                  transition: "all 0.2s ease",
                  opacity: inUse ? 0.7 : 1,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                <GripVertical size={10} style={{ opacity: 0.4 }} />
                <t.icon size={13} />
                {t.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SPLIT PANELS ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {panels.map((panelKey, idx) => {
          const info = getTabInfo(panelKey);
          return (
            <div
              key={panelKey + idx}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                borderRight: idx < panels.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                overflow: "hidden", position: "relative",
                minWidth: 0,
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
            >
              {/* Panel Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "6px 12px", height: 32,
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                flexShrink: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {info && <info.icon size={12} style={{ color: "#63b3ed" }} />}
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#8892b0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {info?.label}
                  </span>
                </div>
                {panels.length > 1 && (
                  <button onClick={() => removePanel(panelKey)} style={{
                    ...iconBtnStyle, padding: 3,
                  }}>
                    <X size={11} />
                  </button>
                )}
              </div>
              {/* Panel Content */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                {panelKey === "notes" && <NotesPanel />}
                {panelKey === "ai" && <AIPanel />}
                {panelKey === "youtube" && <YouTubePanel />}
                {panelKey === "draw" && <DrawPanel />}
                {panelKey === "code" && <CodePanel />}
                {panelKey === "calc" && <QuickCalcPanel />}
                {panelKey === "flashcards" && <FlashcardsPanel />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const iconBtnStyle = {
  padding: 5, borderRadius: 6, background: "none", border: "none",
  color: "#667a8c", cursor: "pointer", display: "flex",
};

/* ═══ NOTES ═══ */
function NotesPanel() {
  const [content, setContent] = useState("# Session Notes\n\nStart typing...\n\n- Topic 1\n- Topic 2");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        {[Bold, Italic, List].map((Icon, i) => (
          <button key={i} style={iconBtnStyle}><Icon size={13} /></button>
        ))}
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{
        flex: 1, background: "transparent", padding: 16, fontSize: 13,
        color: "#d4d8e8", resize: "none", border: "none", outline: "none",
        lineHeight: 1.8, fontFamily: "'JetBrains Mono', monospace",
      }} />
    </div>
  );
}

/* ═══ AI ═══ */
function AIPanel() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI study assistant. Ask me anything about your current topic." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p,
      { role: "user", content: input },
      { role: "assistant", content: "That's a great question! AI integration coming soon." },
    ]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "8px 12px", borderRadius: 12,
              fontSize: 12, lineHeight: 1.6,
              background: msg.role === "user" ? "rgba(99,179,237,0.15)" : "rgba(255,255,255,0.04)",
              color: msg.role === "user" ? "#a3d4f7" : "#b0b8cc",
              border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.06)",
            }}>{msg.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10, padding: "6px 10px",
        }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12, color: "#d4d8e8" }} />
          <button onClick={send} style={{ ...iconBtnStyle, color: "#63b3ed" }}><Send size={14} /></button>
        </div>
      </div>
    </div>
  );
}

/* ═══ YOUTUBE ═══ */
function YouTubePanel() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const load = () => {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    if (m) setEmbedUrl(`https://www.youtube.com/embed/${m[1]}`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>
      <div style={{ padding: "12px 16px", display: "flex", gap: 6, width: "100%" }}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Paste YouTube URL..."
          style={{ flex: 1, padding: "8px 12px", fontSize: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#d4d8e8", outline: "none" }} />
        <button onClick={load} style={{ padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#63b3ed", color: "#1a1e2e", border: "none", cursor: "pointer" }}>Load</button>
      </div>
      <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {embedUrl ? (
          <iframe src={embedUrl} style={{ width: "95%", height: "90%", border: "none", borderRadius: 8 }} allowFullScreen />
        ) : (
          <div style={{ textAlign: "center" }}>
            <MonitorPlay size={32} style={{ color: "#2e3450", marginBottom: 8 }} />
            <p style={{ fontSize: 12, color: "#556" }}>Paste a YouTube URL above</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ DRAW ═══ */
function DrawPanel() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#d4d8e8");
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
    ctx.fillStyle = "#141726";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => { const c = canvasRef.current; if (c) setHistory((h) => [...h.slice(-20), c.toDataURL()]); };
  const undo = () => {
    if (history.length < 2) return;
    const img = new window.Image();
    img.onload = () => getCtx()?.drawImage(img, 0, 0);
    img.src = history[history.length - 2];
    setHistory((h) => h.slice(0, -1));
  };
  const clearAll = () => { const ctx = getCtx(); const c = canvasRef.current; if (ctx && c) { ctx.fillStyle = "#141726"; ctx.fillRect(0, 0, c.width, c.height); saveState(); } };
  const getPos = (e) => { const r = canvasRef.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  const onDown = (e) => { const p = getPos(e); setDrawing(true); setStartPos(p); if (tool === "pen" || tool === "eraser") { const ctx = getCtx(); ctx.beginPath(); ctx.moveTo(p.x, p.y); } };
  const onMove = (e) => { if (!drawing) return; const p = getPos(e); if (tool === "pen" || tool === "eraser") { const ctx = getCtx(); ctx.lineWidth = tool === "eraser" ? lineWidth * 4 : lineWidth; ctx.strokeStyle = tool === "eraser" ? "#141726" : color; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineTo(p.x, p.y); ctx.stroke(); } };
  const onUp = (e) => {
    if (!drawing) return;
    const p = getPos(e); const ctx = getCtx();
    if (ctx && startPos && ["line", "rect", "circle"].includes(tool)) {
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap = "round";
      if (tool === "line") { ctx.beginPath(); ctx.moveTo(startPos.x, startPos.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      else if (tool === "rect") { ctx.strokeRect(startPos.x, startPos.y, p.x - startPos.x, p.y - startPos.y); }
      else { const rx = Math.abs(p.x - startPos.x) / 2; const ry = Math.abs(p.y - startPos.y) / 2; ctx.beginPath(); ctx.ellipse(startPos.x + (p.x - startPos.x) / 2, startPos.y + (p.y - startPos.y) / 2, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); }
    }
    setDrawing(false); saveState();
  };

  const drawTools = [
    { key: "pen", icon: Pencil }, { key: "eraser", icon: Eraser },
    { key: "line", icon: Minus }, { key: "rect", icon: Square }, { key: "circle", icon: Circle },
  ];
  const colors = ["#d4d8e8", "#f87171", "#fb923c", "#facc15", "#4ade80", "#63b3ed", "#a78bfa", "#f472b6"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
        {drawTools.map((t) => (
          <button key={t.key} onClick={() => setTool(t.key)} style={{
            ...iconBtnStyle, background: tool === t.key ? "rgba(99,179,237,0.15)" : "transparent",
            color: tool === t.key ? "#63b3ed" : "#556",
            border: tool === t.key ? "1px solid rgba(99,179,237,0.25)" : "1px solid transparent", borderRadius: 6,
          }}><t.icon size={13} /></button>
        ))}
        <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.06)", margin: "0 2px" }} />
        {colors.map((c) => (
          <div key={c} onClick={() => setColor(c)} style={{
            width: 16, height: 16, borderRadius: "50%", background: c, cursor: "pointer",
            border: color === c ? "2px solid #fff" : "2px solid transparent",
          }} />
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          <button onClick={undo} style={iconBtnStyle}><Undo2 size={13} /></button>
          <button onClick={clearAll} style={iconBtnStyle}><Trash2 size={13} /></button>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ flex: 1, cursor: "crosshair", display: "block" }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} />
    </div>
  );
}

/* ═══ CODE ═══ */
function CodePanel() {
  const [code, setCode] = useState('// JavaScript Editor\nconsole.log("Hello from Abdi\'s Library!");\n\nconst gpa = (3.5 + 4.0 + 3.7) / 3;\nconsole.log("Average GPA:", gpa.toFixed(2));\n');
  const [output, setOutput] = useState("");
  const run = () => {
    const logs = [];
    const ol = console.log; const oe = console.error;
    console.log = (...a) => logs.push(a.map(String).join(" "));
    console.error = (...a) => logs.push("ERROR: " + a.map(String).join(" "));
    try { const r = new Function(code)(); if (r !== undefined) logs.push("-> " + String(r)); }
    catch (e) { logs.push("Error: " + e.message); }
    console.log = ol; console.error = oe;
    setOutput(logs.join("\n"));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "6px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#556", textTransform: "uppercase" }}>JS Editor</span>
        <button onClick={run} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: "#2d9d78", color: "#fff", border: "none", cursor: "pointer" }}>
          <Play size={11} /> Run
        </button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{
          flex: 1, background: "transparent", padding: 12, fontSize: 12,
          color: "#d4d8e8", resize: "none", border: "none", outline: "none",
          lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }} spellCheck={false} />
        <div style={{ flex: 1, padding: 12, fontSize: 12, color: "#8892b0", overflow: "auto", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
          {output || "// Output appears here"}
        </div>
      </div>
    </div>
  );
}

/* ═══ CALC ═══ */
function QuickCalcPanel() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState(null);
  const calc = () => { try { setResult(new Function("return " + expr)()); } catch { setResult("Error"); } };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 300 }}>
        <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calc()}
          placeholder="Type expression..."
          style={{ width: "100%", padding: "10px 14px", fontSize: 16, textAlign: "right", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#d4d8e8", outline: "none", fontFamily: "'Space Grotesk', sans-serif" }} />
        {result !== null && (
          <div style={{ textAlign: "right", fontSize: 28, fontWeight: 800, color: "#63b3ed", marginTop: 10, fontFamily: "'Space Grotesk', sans-serif" }}>= {String(result)}</div>
        )}
        <button onClick={calc} style={{ width: "100%", marginTop: 12, padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#63b3ed", color: "#1a1e2e", border: "none", cursor: "pointer" }}>Calculate</button>
      </div>
    </div>
  );
}

/* ═══ FLASHCARDS ═══ */
function FlashcardsPanel() {
  const [cards, setCards] = useState([
    { id: 1, front: "What is O(n log n)?", back: "Time complexity of efficient sorting algorithms" },
    { id: 2, front: "What is polymorphism?", back: "Objects taking multiple forms via method overriding/overloading" },
    { id: 3, front: "What is normalization?", back: "Organizing a database to reduce redundancy (1NF->2NF->3NF)" },
  ]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[idx];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 20, gap: 14 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "#556", textTransform: "uppercase" }}>Card {idx + 1} / {cards.length}</p>
      {card && (
        <div onClick={() => setFlipped(!flipped)} style={{
          width: "90%", maxWidth: 340, minHeight: 160, borderRadius: 12,
          background: flipped ? "rgba(99,179,237,0.1)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${flipped ? "rgba(99,179,237,0.2)" : "rgba(255,255,255,0.06)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24, cursor: "pointer", transition: "all 0.3s ease",
        }}>
          <p style={{ fontSize: flipped ? 13 : 16, fontWeight: flipped ? 400 : 600, color: flipped ? "#a3d4f7" : "#d4d8e8", textAlign: "center", lineHeight: 1.7 }}>
            {flipped ? card.back : card.front}
          </p>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); }}
          style={{ padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.04)", color: "#8892b0", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>Prev</button>
        <button onClick={() => { setIdx((i) => (i + 1) % cards.length); setFlipped(false); }}
          style={{ padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "rgba(99,179,237,0.12)", color: "#63b3ed", border: "1px solid rgba(99,179,237,0.2)", cursor: "pointer" }}>Next</button>
      </div>
    </div>
  );
}
