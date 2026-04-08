import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, StickyNote, Bot, MonitorPlay, Send,
  Bold, Italic, List, Pencil, Code2,
  Eraser, Circle, Square, Minus, Undo2, Trash2,
  Play, Calculator, FileText, GripVertical, Plus, ChevronDown, Check
} from "lucide-react";

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
  
  // State
  const [classroomName, setClassroomName] = useState("Data Structures Lab");
  const [isEditingName, setIsEditingName] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [panels, setPanels] = useState(["notes", "youtube", "ai"]); // starting with 3
  const [dragItem, setDragItem] = useState(null);

  // Focus input when editing name
  const nameInputRef = useRef(null);
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  const addPanel = (key) => {
    if (panels.includes(key)) return;
    if (panels.length >= 4) return;
    setPanels([...panels, key]);
    setToolboxOpen(false);
  };

  const removePanel = (key) => {
    if (panels.length <= 1) return;
    setPanels(panels.filter(p => p !== key));
  };

  const replacePanel = (idx, key) => {
    const next = [...panels];
    next[idx] = key;
    setPanels(next);
    setToolboxOpen(false);
  };

  const handleDragStart = (key) => setDragItem(key);
  const handleDragEnd = () => setDragItem(null);
  const handleDrop = (idx) => {
    if (!dragItem) return;
    if (panels.includes(dragItem)) {
      const from = panels.indexOf(dragItem);
      const next = [...panels];
      next.splice(from, 1);
      next.splice(idx, 0, dragItem);
      setPanels(next);
    } else {
      if (panels.length < 4) {
        const next = [...panels];
        next.splice(idx, 0, dragItem);
        setPanels(next);
      } else {
        replacePanel(idx, dragItem);
      }
    }
    setDragItem(null);
    setToolboxOpen(false);
  };

  const getTabInfo = (key) => ALL_TABS.find((t) => t.key === key);

  // Dynamic grid setup based on number of panels
  const getGridStyle = () => {
    switch (panels.length) {
      case 1:
        return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr" };
      case 2:
        return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr" };
      case 3:
        return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gridTemplateAreas: `
          "p0 p1"
          "p0 p2"
        `};
      case 4:
        return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
      default:
        return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr" };
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "var(--bg-base)", color: "var(--text-primary)",
      display: "flex", flexDirection: "column", zIndex: 50,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* ── Floating Oval Toolbox ── */}
      <div style={{
        position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <button onClick={() => setToolboxOpen(!toolboxOpen)} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 24px", borderRadius: 40,
          background: "var(--text-primary)", color: "#fff",
          border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: 700,
          boxShadow: "var(--shadow-md)", transition: "all 0.3s ease",
        }}>
          <Plus size={16} /> Toolbox
          <ChevronDown size={14} style={{ transform: toolboxOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
        </button>

        {toolboxOpen && (
          <div style={{
            marginTop: 10, background: "var(--bg-elevated)", border: "1px solid var(--border)",
            borderRadius: 30, padding: "8px 12px", display: "flex", gap: 8,
            boxShadow: "var(--shadow-lg)", animation: "fadeInDown 0.2s ease-out",
          }}>
            {ALL_TABS.map((t) => {
              const inUse = panels.includes(t.key);
              return (
                <div
                  key={t.key}
                  draggable={!inUse}
                  onDragStart={(e) => { if (inUse) { e.preventDefault(); } else { handleDragStart(t.key); } }}
                  onDragEnd={handleDragEnd}
                  onClick={() => !inUse && addPanel(t.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 24, fontSize: 13, fontWeight: 600,
                    background: inUse ? "transparent" : "var(--bg-surface)",
                    color: inUse ? "var(--text-faint)" : "var(--text-primary)",
                    border: `1px solid ${inUse ? "transparent" : "var(--border)"}`,
                    cursor: inUse ? "not-allowed" : "grab",
                    whiteSpace: "nowrap", userSelect: "none",
                  }}
                >
                  <GripVertical size={12} style={{ opacity: 0.4 }} />
                  <t.icon size={14} />
                  {t.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Top Bar ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 60,
        background: "var(--bg-surface)", borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/classroom")} style={{ ...iconBtnStyle, border: "1px solid var(--border)" }}>
            <ArrowLeft size={16} />
          </button>
          
          {/* Editable Name */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isEditingName ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input 
                  ref={nameInputRef}
                  value={classroomName}
                  onChange={(e) => setClassroomName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
                  style={{
                    fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                    color: "var(--text-primary)", background: "var(--bg-base)",
                    border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px",
                    outline: "none", width: 240
                  }}
                />
                <button onClick={() => setIsEditingName(false)} style={iconBtnStyle}><Check size={16} /></button>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditingName(true)}
                style={{ 
                  fontSize: 18, fontWeight: 800, color: "var(--text-primary)", 
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  padding: "4px 8px", borderRadius: 6,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                title="Click to rename"
              >
                {classroomName}
                <Pencil size={12} style={{ color: "var(--text-faint)" }} />
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>{panels.length}/4 Windows Used</span>
        </div>
      </header>

      {/* ── WINDOWS GRID (Split Screen) ── */}
      <div style={{ flex: 1, padding: 12, background: "var(--bg-base)", display: "flex", overflow: "hidden" }}>
        <div style={{
          flex: 1, display: "grid", gap: 12,
          ...getGridStyle()
        }}>
          {panels.map((panelKey, idx) => {
            const info = getTabInfo(panelKey);
            return (
              <div
                key={panelKey + idx}
                style={{
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  borderRadius: 16, display: "flex", flexDirection: "column",
                  overflow: "hidden", position: "relative",
                  boxShadow: "var(--shadow-sm)",
                  gridArea: panels.length === 3 ? `p${idx}` : "auto",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(idx)}
              >
                {/* Panel Header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "space-between",
                  padding: "10px 16px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)",
                  cursor: "grab",
                }}
                  draggable
                  onDragStart={() => handleDragStart(panelKey)}
                  onDragEnd={handleDragEnd}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <GripVertical size={14} style={{ color: "var(--text-faint)" }} />
                    {info && <info.icon size={16} style={{ color: "var(--text-primary)" }} />}
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{info?.label}</span>
                  </div>
                  {panels.length > 1 && (
                    <button onClick={() => removePanel(panelKey)} style={{ ...iconBtnStyle, padding: 4 }}>
                      <Trash2 size={13} style={{ color: "var(--text-faint)" }} />
                    </button>
                  )}
                </div>
                {/* Panel Content (Scrollable) */}
                <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {panelKey === "notes" && <NotesPanel />}
                  {panelKey === "ai" && <AIPanel />}
                  {panelKey === "youtube" && <YouTubePanel />}
                  {panelKey === "draw" && <DrawPanel />}
                  {panelKey === "code" && <CodePanel />}
                  {panelKey === "calc" && <QuickCalcPanel />}
                  {panelKey === "flashcards" && <FlashcardsPanel />}
                </div>

                {/* Drop Overlay */}
                {dragItem && dragItem !== panelKey && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0.05)",
                    border: "2px dashed var(--text-primary)", borderRadius: 16, zIndex: 10,
                    pointerEvents: "none",
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  padding: 6, borderRadius: 8, background: "var(--bg-elevated)", border: "none",
  color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
};

/* ═══ PANELS (Updated for new theme & interaction) ═══ */

/* NOTES */
function NotesPanel() {
  const [content, setContent] = useState("# Lecture Notes\n\n- Start capturing ideas...");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderBottom: "1px solid var(--border)" }}>
        {[Bold, Italic, List].map((Icon, i) => (
          <button key={i} style={{ ...iconBtnStyle, background: "transparent" }}><Icon size={14} /></button>
        ))}
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{
        flex: 1, background: "var(--bg-surface)", padding: 20, fontSize: 14,
        color: "var(--text-primary)", resize: "none", border: "none", outline: "none",
        lineHeight: 1.8, fontFamily: "'Inter', sans-serif",
      }} spellCheck={false} />
    </div>
  );
}

/* AI */
function AIPanel() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm your study AI. What are we learning today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { role: "user", content: input }, { role: "assistant", content: "I'm analyzing that concept for you..." }]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%", padding: "10px 14px", borderRadius: 16, fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
              background: msg.role === "user" ? "var(--text-primary)" : "var(--bg-elevated)",
              color: msg.role === "user" ? "#fff" : "var(--text-primary)",
              border: msg.role === "user" ? "none" : "1px solid var(--border)",
              borderBottomRightRadius: msg.role === "user" ? 4 : 16,
              borderTopLeftRadius: msg.role === "assistant" ? 4 : 16,
            }}>{msg.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: 12, borderTop: "1px solid var(--border)", background: "var(--bg-elevated)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: "var(--bg-base)",
          border: "1px solid var(--border)", borderRadius: 12, padding: "6px 12px",
        }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask a question..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--text-primary)" }} />
          <button onClick={send} style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "flex", padding: 4 }}><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}

/* YOUTUBE */
function YouTubePanel() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=kYxj2D8aIQQ");
  const [embedUrl, setEmbedUrl] = useState("https://www.youtube.com/embed/kYxj2D8aIQQ");

  const load = () => {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    if (m) setEmbedUrl(`https://www.youtube.com/embed/${m[1]}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: 12, display: "flex", gap: 8, borderBottom: "1px solid var(--border)", background: "var(--bg-elevated)" }}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Paste YouTube URL..." style={{ flex: 1, padding: "8px 12px", fontSize: 13, background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 8, outline: "none" }} />
        <button onClick={load} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12, borderRadius: 8 }}>Load</button>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
        {embedUrl ? (
          <iframe src={embedUrl} style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen />
        ) : (
          <MonitorPlay size={40} style={{ color: "#333" }} />
        )}
      </div>
    </div>
  );
}

/* DRAW */
function DrawPanel() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#1f2430");
  const [lineWidth] = useState(3);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [history, setHistory] = useState([]);

  const getCtx = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const ctx = getCtx();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
    
    const handleResize = () => {
      // Save current drawing
      const dataUrl = canvas.toDataURL();
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const img = new window.Image();
      img.onload = () => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = dataUrl;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveState = () => { const c = canvasRef.current; if (c) setHistory(h => [...h.slice(-20), c.toDataURL()]); };
  const undo = () => {
    if (history.length < 2) return;
    const img = new window.Image();
    img.onload = () => getCtx()?.drawImage(img, 0, 0);
    img.src = history[history.length - 2];
    setHistory(h => h.slice(0, -1));
  };
  const clearAll = () => { const ctx = getCtx(); const c = canvasRef.current; if (ctx && c) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, c.width, c.height); saveState(); } };
  const getPos = (e) => { const r = canvasRef.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  const onDown = (e) => { const p = getPos(e); setDrawing(true); setStartPos(p); if (tool === "pen" || tool === "eraser") { const ctx = getCtx(); ctx.beginPath(); ctx.moveTo(p.x, p.y); } };
  const onMove = (e) => { if (!drawing) return; const p = getPos(e); if (tool === "pen" || tool === "eraser") { const ctx = getCtx(); ctx.lineWidth = tool === "eraser" ? lineWidth * 6 : lineWidth; ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineTo(p.x, p.y); ctx.stroke(); } };
  const onUp = (e) => {
    if (!drawing) return;
    const p = getPos(e); const ctx = getCtx();
    if (ctx && startPos && ["line", "rect", "circle"].includes(tool)) {
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap = "round";
      if (tool === "line") { ctx.beginPath(); ctx.moveTo(startPos.x, startPos.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      else if (tool === "rect") { ctx.strokeRect(startPos.x, startPos.y, p.x - startPos.x, p.y - startPos.y); }
      else { const rx = Math.abs(p.x - startPos.x)/2; const ry = Math.abs(p.y - startPos.y)/2; ctx.beginPath(); ctx.ellipse(startPos.x + rx, startPos.y + ry, rx, ry, 0, 0, Math.PI*2); ctx.stroke(); }
    }
    setDrawing(false); saveState();
  };

  const drawTools = [{ key: "pen", icon: Pencil }, { key: "eraser", icon: Eraser }, { key: "line", icon: Minus }, { key: "rect", icon: Square }, { key: "circle", icon: Circle }];
  const colors = ["#1f2430", "#e74c3c", "#f39c12", "#2ecc71", "#3498db", "#9b59b6"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "var(--bg-elevated)", flexWrap: "wrap" }}>
        {drawTools.map((t) => (
          <button key={t.key} onClick={() => setTool(t.key)} style={{
            ...iconBtnStyle, background: tool === t.key ? "var(--text-primary)" : "transparent",
            color: tool === t.key ? "#fff" : "var(--text-secondary)", padding: 6,
          }}><t.icon size={14} /></button>
        ))}
        <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 4px" }} />
        {colors.map((c) => (
          <div key={c} onClick={() => setColor(c)} style={{
            width: 20, height: 20, borderRadius: "50%", background: c, cursor: "pointer",
            border: color === c ? "2px solid var(--text-primary)" : "2px solid transparent",
          }} />
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          <button onClick={undo} style={{ ...iconBtnStyle, background: "var(--bg-base)" }}><Undo2 size={14} /></button>
          <button onClick={clearAll} style={{ ...iconBtnStyle, background: "var(--bg-base)" }}><Trash2 size={14} /></button>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", background: "#fff" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, cursor: "crosshair" }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} />
      </div>
    </div>
  );
}

/* CODE */
function CodePanel() {
  const [code, setCode] = useState('// JS Editor\nconst scores = [85, 92, 78, 90];\nconst avg = scores.reduce((a, b) => a + b) / scores.length;\nconsole.log(`Average score: ${avg}`);\n');
  const [output, setOutput] = useState("");
  const run = () => {
    const logs = []; const ol = console.log; const oe = console.error;
    console.log = (...a) => logs.push(a.map(String).join(" "));
    console.error = (...a) => logs.push("ERROR: " + a.map(String).join(" "));
    try { const r = new Function(code)(); if (r !== undefined) logs.push("-> " + String(r)); }
    catch (e) { logs.push("Error: " + e.message); }
    console.log = ol; console.error = oe;
    setOutput(logs.join("\n"));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderBottom: "1px solid var(--border)", background: "var(--bg-elevated)" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", fontFamily: "'Space Grotesk', sans-serif" }}>JS Output</span>
        <button onClick={run} className="btn btn-primary" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 12, borderRadius: 6 }}>
          <Play size={12} /> Run
        </button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "column" }}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{
          flex: 1, background: "#1a1a2e", padding: 16, fontSize: 13,
          color: "#e2e8f0", resize: "none", border: "none", outline: "none",
          lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace",
        }} spellCheck={false} />
        <div style={{ flex: "0 0 30%", background: "#0f0f1a", padding: 12, fontSize: 12, color: "#a0aec0", overflow: "auto", fontFamily: "'JetBrains Mono', monospace", borderTop: "1px solid #2d2d44" }}>
          {output || "// Output will appear here"}
        </div>
      </div>
    </div>
  );
}

/* CALC */
function QuickCalcPanel() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState(null);
  const calc = () => { try { setResult(new Function("return " + expr)()); } catch { setResult("Error"); } };
  
  const buttons = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+'];

  const handleBtn = (b) => {
    if (b === 'C') { setExpr(""); setResult(null); }
    else setExpr(p => p + b);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 20, background: "var(--bg-surface)" }}>
      <div style={{ width: "100%", maxWidth: 280, background: "var(--bg-base)", padding: 20, borderRadius: 20, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
        <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} onKeyDown={(e) => e.key === "Enter" && calc()}
          placeholder="0" style={{ width: "100%", padding: 12, fontSize: 24, textAlign: "right", background: "transparent", border: "none", borderBottom: "2px solid var(--border)", color: "var(--text-primary)", outline: "none", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }} />
        
        {result !== null && (
          <div style={{ textAlign: "right", fontSize: 28, fontWeight: 800, color: "var(--text-primary)", marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>= {String(result)}</div>
        )}
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {buttons.map(b => (
            <button key={b} onClick={() => handleBtn(b)} style={{
              padding: "14px 0", fontSize: 18, fontWeight: 600, borderRadius: 12, border: "1px solid var(--border)",
              background: ['/','*','-','+','C'].includes(b) ? "var(--bg-elevated)" : "#fff",
              color: "var(--text-primary)", cursor: "pointer", transition: "all 0.2s"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(0.95)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>
              {b}
            </button>
          ))}
        </div>
        <button onClick={calc} className="btn btn-primary" style={{ width: "100%", padding: 14, marginTop: 10, fontSize: 16, borderRadius: 12 }}>Calculate</button>
      </div>
    </div>
  );
}

/* FLASHCARDS */
function FlashcardsPanel() {
  const [cards] = useState([
    { id: 1, front: "What is Polymorphism?", back: "Ability of different objects to respond to the same method call in their own way." },
    { id: 2, front: "O(log n) vs O(1)", back: "O(1) is constant time. O(log n) means time increases logarithmically as data grows (like binary search)." },
  ]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[idx];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 24, gap: 20, background: "var(--bg-elevated)" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Card {idx + 1} of {cards.length}</p>
      {card && (
        <div onClick={() => setFlipped(!flipped)} style={{
          width: "100%", maxWidth: 360, minHeight: 200, borderRadius: 20,
          background: flipped ? "var(--text-primary)" : "#fff",
          border: flipped ? "none" : "1px solid var(--border)",
          boxShadow: flipped ? "var(--shadow-lg)" : "var(--shadow-sm)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 32, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: flipped ? "scale(1.02)" : "scale(1)",
        }}>
          <p style={{ fontSize: flipped ? 15 : 20, fontWeight: flipped ? 500 : 700, color: flipped ? "#fff" : "var(--text-primary)", textAlign: "center", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
            {flipped ? card.back : card.front}
          </p>
        </div>
      )}
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => { setIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); }} className="btn btn-secondary" style={{ padding: "8px 20px" }}>Previous</button>
        <button onClick={() => { setIdx((i) => (i + 1) % cards.length); setFlipped(false); }} className="btn btn-primary" style={{ padding: "8px 20px" }}>Next Card</button>
      </div>
    </div>
  );
}
