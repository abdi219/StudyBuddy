import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, StickyNote, Bot, MonitorPlay, Send,
  Bold, Italic, List, Pencil, Code2,
  Eraser, Circle, Square, Minus, Undo2, Trash2,
  Play, Calculator, FileText, GripVertical, Plus, ChevronDown, Check,
  Underline, Type, Palette, Maximize2, Minimize2, Music
} from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const ALL_TABS = [
  { key: "youtube", icon: MonitorPlay, label: "YouTube" },
  { key: "notes", icon: StickyNote, label: "Notes" },
  { key: "draw", icon: Pencil, label: "Draw" },
  { key: "ai", icon: Bot, label: "AI Chat" },
  { key: "code", icon: Code2, label: "Code" },
  { key: "calc", icon: Calculator, label: "Calculator" },
  { key: "flashcards", icon: FileText, label: "Flashcards" },
  { key: "lofi", icon: Music, label: "Lo-Fi Audio" },
];

export default function ActiveClassroom() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [classroomName, setClassroomName] = useState("Data Structures Lab");
  const [isEditingName, setIsEditingName] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [panels, setPanels] = useState(["notes", "youtube", "ai", "lofi"]);
  const [dragItem, setDragItem] = useState(null);
  const [fullscreenPanel, setFullscreenPanel] = useState(null);

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
    if (fullscreenPanel === key) setFullscreenPanel(null);
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
      background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)", 
      color: "var(--text-primary)",
      display: "flex", flexDirection: "column", zIndex: 50,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* High-density scattered doodles for a lively environment */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <StudentDoodles count={40} opacity={0.18} seed={101} color="var(--text-primary)" />
        <StudentDoodles count={20} opacity={0.12} seed={505} color="var(--accent)" />
      </div>

      {/* ── Floating Oval Drawer ── */}
      <div style={{
        position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <button onClick={() => setToolboxOpen(!toolboxOpen)} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 32px", borderRadius: 40,
          background: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(255, 255, 255, 0.9)",
          color: "var(--text-primary)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          cursor: "pointer", fontSize: 13, fontWeight: 800,
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)", transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
          <Plus size={18} /> The Drawer
          <ChevronDown size={16} style={{ transform: toolboxOpen ? "rotate(180deg)" : "none", transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
        </button>

        {toolboxOpen && (
          <div style={{
            marginTop: 12, background: "rgba(255, 255, 255, 0.85)", border: "1px solid rgba(255, 255, 255, 0.9)",
            borderRadius: 30, padding: "8px 12px", display: "flex", gap: 8, backdropFilter: "blur(20px)",
            boxShadow: "var(--shadow-xl)", animation: "liquidDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards", transformOrigin: "top center"
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
                    padding: "8px 16px", borderRadius: 24, fontSize: 13, fontWeight: 700,
                    background: inUse ? "transparent" : "#fff",
                    color: inUse ? "var(--text-faint)" : "var(--text-primary)",
                    border: `1px solid ${inUse ? "transparent" : "var(--border-light)"}`,
                    cursor: inUse ? "not-allowed" : "grab",
                    whiteSpace: "nowrap", userSelect: "none",
                    boxShadow: inUse ? "none" : "var(--shadow-sm)"
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
        background: "rgba(255, 255, 255, 0.6)", borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        flexShrink: 0, zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/classroom")} style={{ ...iconBtnStyle, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }} onMouseEnter={e => e.currentTarget.style.transform = "translateX(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>
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
                  onBlur={() => setIsEditingName(false)}
                  style={{
                    fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                    color: "var(--text-primary)", background: "rgba(255,255,255,0.8)",
                    border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px",
                    outline: "none", width: 240
                  }}
                />
              </div>
            ) : (
              <div 
                onClick={() => setIsEditingName(true)}
                style={{ 
                  fontSize: 18, fontWeight: 800, color: "var(--text-primary)", 
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  padding: "4px 8px", borderRadius: 6, transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                title="Click to rename"
              >
                {classroomName}
                <Pencil size={12} style={{ color: "var(--text-muted)", opacity: 0.8 }} />
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 20 }}>{panels.length}/4 Windows Used</span>
        </div>
      </header>

      {/* ── WINDOWS GRID (Liquid Glass Split Screen) ── */}
      <div style={{ flex: 1, padding: 16, display: "flex", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div style={{
          flex: 1, display: "grid", gap: 16,
          ...getGridStyle()
        }}>
          {panels.map((panelKey, idx) => {
            const info = getTabInfo(panelKey);
            const isFullscreen = fullscreenPanel === panelKey;
            
            return (
              <div
                key={panelKey + idx}
                style={{
                  background: "rgba(255, 255, 255, 0.72)", 
                  border: "1px solid rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                  borderRadius: 24, display: "flex", flexDirection: "column",
                  overflow: "hidden", position: isFullscreen ? "absolute" : "relative",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
                  gridArea: (panels.length === 3 && !isFullscreen) ? `p${idx}` : "auto",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  ...(isFullscreen ? { inset: 16, zIndex: 100 } : { opacity: fullscreenPanel && !isFullscreen ? 0 : 1, pointerEvents: fullscreenPanel && !isFullscreen ? "none" : "auto" }) // hide others gently
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(idx)}
              >
                {/* Panel Header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 20px", background: "rgba(255, 255, 255, 0.5)", borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
                  cursor: isFullscreen ? "default" : "grab",
                }}
                  draggable={!isFullscreen}
                  onDragStart={() => !isFullscreen && handleDragStart(panelKey)}
                  onDragEnd={handleDragEnd}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {!isFullscreen && <GripVertical size={14} style={{ color: "var(--text-faint)" }} />}
                    {info && <info.icon size={16} style={{ color: "var(--accent)" }} />}
                    <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.02em" }}>{info?.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => setFullscreenPanel(isFullscreen ? null : panelKey)} style={{ ...iconBtnStyle, background: "rgba(255,255,255,0.6)", padding: 6, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.6)"} title={isFullscreen ? "Minimize" : "Focus Mode"}>
                      {isFullscreen ? <Minimize2 size={13} style={{ color: "var(--text-secondary)" }} /> : <Maximize2 size={13} style={{ color: "var(--text-secondary)" }} />}
                    </button>
                    {panels.length > 1 && !isFullscreen && (
                      <button onClick={() => removePanel(panelKey)} style={{ ...iconBtnStyle, background: "rgba(255,255,255,0.6)", padding: 6, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#d14343"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "var(--text-primary)"; }}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Panel Content (Scrollable) */}
                <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", background: panelKey === 'code' ? "#1a1a2e" : "transparent" }}>
                  {panelKey === "notes" && <NotesPanel />}
                  {panelKey === "ai" && <AIPanel />}
                  {panelKey === "youtube" && <YouTubePanel />}
                  {panelKey === "lofi" && <LofiPanel />}
                  {panelKey === "draw" && <DrawPanel />}
                  {panelKey === "code" && <CodePanel />}
                  {panelKey === "calc" && <QuickCalcPanel />}
                  {panelKey === "flashcards" && <FlashcardsPanel />}
                </div>

                {/* Drop Overlay for drag/drop targeting */}
                {dragItem && dragItem !== panelKey && !isFullscreen && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(255,255,255,0.3)", backdropFilter: "blur(4px)",
                    border: "3px dashed var(--accent)", borderRadius: 24, zIndex: 10,
                    pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", background: "#fff", padding: "8px 16px", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>Drop to Swap</span>
                  </div>
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
  padding: 6, borderRadius: 8, background: "rgba(255,255,255,0.5)", border: "none",
  color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
};

/* ═══ PANELS ═══ */

/* NOTES */
function NotesPanel() {
  const [pages, setPages] = useState([{ id: 1, content: "Start capturing ideas..." }]);
  const [activeId, setActiveId] = useState(1);
  const editorRef = useRef(null);

  const activePage = pages.find((p) => p.id === activeId);

  const updateContent = (e) => {
    setPages(pages.map((p) => (p.id === activeId ? { ...p, content: e.currentTarget.innerHTML } : p)));
  };

  const addPage = () => {
    const newId = Date.now();
    setPages([...pages, { id: newId, content: "" }]);
    setActiveId(newId);
  };

  const format = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== activePage?.content) {
      editorRef.current.innerHTML = activePage?.content || "";
    }
  }, [activeId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "transparent" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.4)", flexWrap: "wrap", background: "rgba(255,255,255,0.2)" }}>
        <button onClick={() => format("bold")} style={{ ...iconBtnStyle, background: "transparent" }} title="Bold"><Bold size={14} /></button>
        <button onClick={() => format("italic")} style={{ ...iconBtnStyle, background: "transparent" }} title="Italic"><Italic size={14} /></button>
        <button onClick={() => format("underline")} style={{ ...iconBtnStyle, background: "transparent" }} title="Underline"><Underline size={14} /></button>
        <div style={{ width: 1, height: 16, background: "rgba(0,0,0,0.1)", margin: "0 4px" }} />
        <button onClick={() => format("insertUnorderedList")} style={{ ...iconBtnStyle, background: "transparent" }} title="Bullet List"><List size={14} /></button>
        <button onClick={() => format("formatBlock", "H2")} style={{ ...iconBtnStyle, background: "transparent" }} title="Heading"><Type size={14} /></button>
        <div style={{ position: "relative" }} title="Text Color">
          <input type="color" onChange={(e) => format("foreColor", e.target.value)} style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", cursor: "pointer", inset: 0 }} />
          <button style={{ ...iconBtnStyle, background: "transparent" }}><Palette size={14} /></button>
        </div>
      </div>
      
      <div 
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        style={{
          flex: 1, padding: 24, fontSize: 14,
          color: "var(--text-primary)", outline: "none", overflowY: "auto",
          lineHeight: 1.8, fontFamily: "'Inter', sans-serif",
          background: "rgba(255,255,255,0.3)"
        }} 
        spellCheck={false} 
      />

      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.4)", overflowX: "auto" }}>
        {pages.map((p, i) => (
          <button 
            key={p.id} onClick={() => setActiveId(p.id)} 
            style={{ 
              padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700, 
              background: activeId === p.id ? "var(--text-primary)" : "rgba(255,255,255,0.6)", 
              color: activeId === p.id ? "#fff" : "var(--text-secondary)", 
              border: "1px solid rgba(255,255,255,0.8)", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
            }}
          >
            Page {i + 1}
          </button>
        ))}
        <button onClick={addPage} style={{ ...iconBtnStyle, padding: "4px 8px", background: "transparent", border: "1px dashed rgba(0,0,0,0.2)" }} title="New Page"><Plus size={12} /></button>
      </div>
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "transparent" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%", padding: "12px 16px", borderRadius: 18, fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
              background: msg.role === "user" ? "var(--text-primary)" : "rgba(255,255,255,0.8)",
              color: msg.role === "user" ? "#fff" : "var(--text-primary)",
              border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.9)",
              borderBottomRightRadius: msg.role === "user" ? 4 : 18,
              borderTopLeftRadius: msg.role === "assistant" ? 4 : 18,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
            }}>{msg.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.5)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: "#fff",
          border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, padding: "8px 16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask a question..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--text-primary)" }} />
          <button onClick={send} style={{ background: "var(--accent)", borderRadius: "50%", padding: 6, color: "#fff", border: "none", cursor: "pointer", display: "flex", transition: "transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><Send size={14} style={{ marginLeft: -2, marginTop: 1 }} /></button>
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
      <div style={{ padding: 12, display: "flex", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.4)" }}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Paste YouTube URL..." style={{ flex: 1, padding: "8px 12px", fontSize: 13, background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, outline: "none", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)" }} />
        <button onClick={load} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12, borderRadius: 10 }}>Load</button>
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

/* LO-FI (New Feature) */
function LofiPanel() {
  // Hardcoded to Lofi Girl stream for studying
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#000" }}>
      <div style={{ padding: "10px 16px", display: "flex", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.1)", background: "#111", alignItems: "center" }}>
        <Music size={14} color="#a855f7" />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>Ambient Study Beats</span>
      </div>
      <div style={{ flex: 1 }}>
        <iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen />
      </div>
    </div>
  )
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

  const savedDataRef = useRef(null);

  const getCtx = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const ctx = getCtx();
    
    // Make canvas transparent for the glass effect!
    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
    
    const handleResize = () => {
      const dataUrl = canvas.toDataURL();
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const img = new window.Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    img.onload = () => {
        getCtx()?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        getCtx()?.drawImage(img, 0, 0);
    };
    img.src = history[history.length - 2];
    setHistory(h => h.slice(0, -1));
  };
  const clearAll = () => { const ctx = getCtx(); const c = canvasRef.current; if (ctx && c) { ctx.clearRect(0, 0, c.width, c.height); saveState(); } };
  const getPos = (e) => { const r = canvasRef.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  const onDown = (e) => { 
    const p = getPos(e); setDrawing(true); setStartPos(p); 
    const ctx = getCtx();
    if (tool === "pen" || tool === "eraser") { 
      ctx.beginPath(); ctx.moveTo(p.x, p.y); 
    } else {
      savedDataRef.current = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const onMove = (e) => { 
    if (!drawing) return; 
    const p = getPos(e); 
    const ctx = getCtx();
    if (tool === "pen" || tool === "eraser") { 
      ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
      ctx.lineWidth = tool === "eraser" ? lineWidth * 6 : lineWidth; 
      ctx.strokeStyle = tool === "eraser" ? "rgba(0,0,0,1)" : color; 
      ctx.lineCap = "round"; ctx.lineJoin = "round"; 
      ctx.lineTo(p.x, p.y); ctx.stroke(); 
      ctx.globalCompositeOperation = "source-over"; // reset
    } else if (savedDataRef.current && ["line", "rect", "circle"].includes(tool)) {
      ctx.putImageData(savedDataRef.current, 0, 0);
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap = "round";
      if (tool === "line") { ctx.beginPath(); ctx.moveTo(startPos.x, startPos.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      else if (tool === "rect") { ctx.strokeRect(startPos.x, startPos.y, p.x - startPos.x, p.y - startPos.y); }
      else { const rx = Math.abs(p.x - startPos.x)/2; const ry = Math.abs(p.y - startPos.y)/2; ctx.beginPath(); ctx.ellipse(startPos.x + rx, startPos.y + ry, rx, ry, 0, 0, Math.PI*2); ctx.stroke(); }
    }
  };

  const onUp = (e) => {
    if (!drawing) return;
    setDrawing(false); 
    savedDataRef.current = null;
    saveState();
  };

  const drawTools = [{ key: "pen", icon: Pencil }, { key: "eraser", icon: Eraser }, { key: "line", icon: Minus }, { key: "rect", icon: Square }, { key: "circle", icon: Circle }];
  const colors = ["#1f2430", "#e74c3c", "#f39c12", "#2ecc71", "#3498db", "#9b59b6"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "rgba(255,255,255,0.2)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.5)", flexWrap: "wrap", zIndex: 2 }}>
        {drawTools.map((t) => (
          <button key={t.key} onClick={() => setTool(t.key)} style={{
            ...iconBtnStyle, background: tool === t.key ? "var(--text-primary)" : "transparent",
            color: tool === t.key ? "#fff" : "var(--text-secondary)", padding: 6, transition: "all 0.2s"
          }}><t.icon size={14} /></button>
        ))}
        <div style={{ width: 1, height: 20, background: "rgba(0,0,0,0.1)", margin: "0 4px" }} />
        {colors.map((c) => (
          <div key={c} onClick={() => setColor(c)} style={{
            width: 20, height: 20, borderRadius: "50%", background: c, cursor: "pointer",
            border: color === c ? "2px solid #fff" : "2px solid rgba(0,0,0,0.1)",
            boxShadow: color === c ? "0 0 0 2px var(--text-primary)" : "none", transition: "all 0.2s"
          }} />
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          <button onClick={undo} style={{ ...iconBtnStyle, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}><Undo2 size={14} /></button>
          <button onClick={clearAll} style={{ ...iconBtnStyle, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}><Trash2 size={14} /></button>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", background: "transparent" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, cursor: "crosshair" }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} />
      </div>
    </div>
  );
}

/* CODE */
function CodePanel() {
  const [code, setCode] = useState('// JavaScript Executable Environment\nconst scores = [85, 92, 78, 90, 88];\n\n// Calculate bell curve mean\nconst mean = scores.reduce((a, b) => a + b) / scores.length;\nconsole.log(`Class Average: ${mean}`);\n');
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1a1a2e" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>JS Runtime</span>
        <button onClick={run} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, borderRadius: 6, background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--accent-hover)"} onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}>
          <Play size={12} fill="#fff" /> Run
        </button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "column" }}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{
          flex: 1, background: "transparent", padding: 16, fontSize: 13,
          color: "#fff", resize: "none", border: "none", outline: "none",
          lineHeight: 1.6, fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        }} spellCheck={false} />
        <div style={{ flex: "0 0 30%", background: "rgba(0,0,0,0.4)", padding: 16, fontSize: 12, color: "#4ade80", overflow: "auto", fontFamily: "'JetBrains Mono', 'Courier New', monospace", borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
          {output || "// Output stream awaits..."}
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 20, background: "transparent" }}>
      <div style={{ width: "100%", maxWidth: 320, background: "rgba(255,255,255,0.6)", padding: 24, borderRadius: 24, border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} onKeyDown={(e) => e.key === "Enter" && calc()}
          placeholder="0" style={{ width: "100%", padding: "12px 4px", fontSize: 28, textAlign: "right", background: "transparent", border: "none", borderBottom: "2px solid rgba(0,0,0,0.1)", color: "var(--text-primary)", outline: "none", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }} />
        
        {result !== null && (
          <div style={{ textAlign: "right", fontSize: 32, fontWeight: 800, color: "var(--accent)", marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>= {String(result)}</div>
        )}
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {buttons.map(b => (
            <button key={b} onClick={() => handleBtn(b)} style={{
              padding: "16px 0", fontSize: 20, fontWeight: 700, borderRadius: 16, border: "none",
              background: ['/','*','-','+','C'].includes(b) ? "var(--text-primary)" : "#fff",
              color: ['/','*','-','+','C'].includes(b) ? "#fff" : "var(--text-primary)", 
              cursor: "pointer", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(0.95) translateY(2px)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* FLASHCARDS */
function FlashcardsPanel() {
  const [cards] = useState([
    { id: 1, front: "What is Polymorphism?", back: "Ability of different objects to respond to the same method call in their own way." },
    { id: 2, front: "O(log n) vs O(1)", back: "O(1) is constant time. O(log n) means time increases logarithmically as data grows (like binary search)." },
    { id: 3, front: "What is a Closure?", back: "A function bundled together (enclosed) with references to its surrounding state (the lexical environment)." }
  ]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[idx];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center", padding: 32, gap: 24, background: "transparent" }}>
      <p style={{ fontSize: 13, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,255,255,0.6)", padding: "6px 14px", borderRadius: 20 }}>Flashcard {idx + 1} of {cards.length}</p>
      {card && (
        <div onClick={() => setFlipped(!flipped)} style={{
          width: "100%", maxWidth: 400, minHeight: 240, borderRadius: 24,
          background: flipped ? "linear-gradient(135deg, var(--text-primary) 0%, #2a2a4a 100%)" : "rgba(255, 255, 255, 0.8)",
          border: flipped ? "none" : "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: flipped ? "0 12px 32px rgba(0,0,0,0.15)" : "0 8px 24px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 40, cursor: "pointer", transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: flipped ? "scale(1.02) rotateY(0deg)" : "scale(1) rotateY(0deg)", // simplistic card flip rotation idea
        }}>
          <p style={{ fontSize: flipped ? 16 : 22, fontWeight: flipped ? 500 : 700, color: flipped ? "#fff" : "var(--text-primary)", textAlign: "center", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
            {flipped ? card.back : card.front}
          </p>
        </div>
      )}
      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={() => { setIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(false); }} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 14, cursor: "pointer", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#fff"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}>Previous</button>
        <button onClick={() => { setIdx((i) => (i + 1) % cards.length); setFlipped(false); }} style={{ padding: "12px 24px", background: "var(--accent)", border: "none", borderRadius: 14, cursor: "pointer", fontWeight: 700, fontSize: 13, color: "#fff", boxShadow: "0 4px 12px rgba(91,91,214,0.3)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>Next Card</button>
      </div>
    </div>
  );
}
