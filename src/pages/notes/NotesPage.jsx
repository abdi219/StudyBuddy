import { useState } from "react";
import { Plus, Search, FileText, Clock, Trash2, Pin } from "lucide-react";
import StudentDoodles from "../../components/ui/StudentDoodles";

const COLORS = [
  { name: "Yellow", bg: "#fef6e0", border: "#e5a31d" },
  { name: "Blue", bg: "#ededfc", border: "#5b5bd6" },
  { name: "Green", bg: "#e6f7f0", border: "#2d9d78" },
  { name: "Pink", bg: "#fce7f3", border: "#ec4899" },
  { name: "Orange", bg: "#fff7ed", border: "#fb923c" },
];

const initialNotes = [
  { id: 1, title: "Data Structures — Arrays", content: "Arrays are stored in contiguous memory locations. Access time is O(1). Insertion/deletion is O(n).", timestamp: "2 hours ago", colorIdx: 0, pinned: true },
  { id: 2, title: "OOP — Inheritance vs Composition", content: "Favor composition over inheritance. Inheritance creates tight coupling between parent and child classes.", timestamp: "Yesterday", colorIdx: 1, pinned: false },
  { id: 3, title: "Algorithms — Sorting Comparison", content: "QuickSort: O(n log n) average, O(n²) worst. MergeSort: guaranteed O(n log n). HeapSort: O(n log n) in-place.", timestamp: "3 days ago", colorIdx: 2, pinned: false },
  { id: 4, title: "Database — Normalization", content: "1NF: Atomic values, no repeating groups. 2NF: No partial dependencies. 3NF: No transitive dependencies.", timestamp: "1 week ago", colorIdx: 3, pinned: false },
  { id: 5, title: "OS — Process vs Thread", content: "Process: independent, separate memory. Thread: lightweight, shared memory. Context switching is faster for threads.", timestamp: "2 weeks ago", colorIdx: 4, pinned: true },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColorIdx, setNewColorIdx] = useState(0);

  const filtered = notes.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const openNote = (note) => { setSelected(note); setContent(note.content); };
  const togglePin = (id) => setNotes(notes.map((n) => n.id === id ? { ...n, pinned: !n.pinned } : n));
  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selected?.id === id) { setSelected(null); setContent(""); }
  };
  const addNote = () => {
    if (!newTitle.trim()) return;
    const note = { id: Date.now(), title: newTitle, content: "", timestamp: "Just now", colorIdx: newColorIdx, pinned: false };
    setNotes([note, ...notes]);
    setNewTitle("");
    setShowAdd(false);
    openNote(note);
  };

  return (
    <div style={{ maxWidth: 1000, position: "relative" }} className="fade-enter">
      <StudentDoodles count={10} opacity={0.15} seed={44} color="var(--text-primary)" />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{
              fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text-primary)", marginBottom: 4,
            }}>
              Notes
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Your study notes, organized and searchable • {notes.length} notes
            </p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            <Plus size={15} /> New Note
          </button>
        </div>

        {/* Add Note Form */}
        {showAdd && (
          <div style={{
            background: "var(--bg-surface)", border: "1.5px dashed var(--border-accent)",
            borderRadius: "var(--radius-lg)", padding: 20,
            display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end",
            animation: "fadeInUp 0.3s ease-out",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Title</label>
              <input type="text" placeholder="Note title..." value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{
                  width: "100%", marginTop: 6, padding: "10px 14px", fontSize: 13,
                  border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
                  background: "var(--bg-base)", outline: "none",
                }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Color</label>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {COLORS.map((c, i) => (
                  <div key={i} onClick={() => setNewColorIdx(i)} style={{
                    width: 26, height: 26, borderRadius: "50%", background: c.bg, cursor: "pointer",
                    border: newColorIdx === i ? `2px solid ${c.border}` : "2px solid transparent",
                  }} />
                ))}
              </div>
            </div>
            <button onClick={addNote} className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 13 }}>Create</button>
          </div>
        )}

        {/* Search */}
        <div style={{ position: "relative", maxWidth: 340 }}>
          <Search size={14} style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: "var(--text-faint)",
          }} />
          <input type="text" placeholder="Search notes..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", paddingLeft: 34, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              fontSize: 13, border: "1.5px solid var(--border)", borderRadius: "var(--radius-md)",
              background: "var(--bg-surface)", outline: "none",
            }} />
        </div>

        {/* Notes Grid + Editor */}
        <div style={{
          display: "grid", gridTemplateColumns: "300px 1fr", gap: 16,
        }}>
          {/* Note List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }} className="stagger">
            {sorted.map((note) => {
              const c = COLORS[note.colorIdx];
              const isSelected = selected?.id === note.id;
              return (
                <div key={note.id} onClick={() => openNote(note)} style={{
                  background: c.bg, borderRadius: 6, padding: "14px 16px",
                  cursor: "pointer", position: "relative",
                  border: isSelected ? `2px solid ${c.border}` : "2px solid transparent",
                  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isSelected ? "scale(1.02) rotate(-0.5deg)" : "none",
                  boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.08)" : "0 2px 6px rgba(0,0,0,0.03)",
                }}>
                  {/* Tape */}
                  <div style={{
                    position: "absolute", top: -6, left: "40%", width: 30, height: 12,
                    background: "rgba(255,255,255,0.6)", borderRadius: 2, border: "1px solid rgba(0,0,0,0.04)",
                  }} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {note.title}
                    </h3>
                    <div style={{ display: "flex", gap: 4 }}>
                      {note.pinned && <Pin size={11} style={{ color: c.border }} />}
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {note.content}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text-faint)" }}>
                      <Clock size={10} /> {note.timestamp}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={(e) => { e.stopPropagation(); togglePin(note.id); }} style={{
                        padding: 3, background: "none", border: "none", cursor: "pointer", color: note.pinned ? c.border : "var(--text-faint)",
                      }}><Pin size={11} /></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} style={{
                        padding: 3, background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)",
                      }}><Trash2 size={11} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editor */}
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", overflow: "hidden",
            display: "flex", flexDirection: "column", minHeight: 400,
          }}>
            {selected ? (
              <>
                <div style={{
                  padding: "14px 20px", borderBottom: "1px solid var(--border-light)",
                  background: COLORS[selected.colorIdx]?.bg,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{selected.title}</h3>
                  <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 3 }}>{selected.timestamp}</p>
                </div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{
                  flex: 1, padding: 20, fontSize: 14, color: "var(--text-primary)",
                  background: "transparent", resize: "none", border: "none", outline: "none",
                  lineHeight: 1.8, fontFamily: "'Inter', sans-serif",
                }} placeholder="Write something..." />
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <FileText size={32} style={{ color: "var(--text-faint)", marginBottom: 8 }} />
                  <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Select a note to start editing</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
