import { useState } from "react";
import { Plus, Search, FileText, Clock } from "lucide-react";

const mockNotes = [
  {
    id: 1,
    title: "Data Structures — Arrays",
    preview:
      "Arrays are stored in contiguous memory locations. Access time is O(1)...",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "OOP — Inheritance vs Composition",
    preview:
      "Favor composition over inheritance. Inheritance creates tight coupling...",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    title: "Algorithms — Sorting Comparison",
    preview:
      "QuickSort: O(n log n) average, O(n²) worst. MergeSort: guaranteed...",
    timestamp: "3 days ago",
  },
  {
    id: 4,
    title: "Database — Normalization",
    preview:
      "1NF: Atomic values, no repeating groups. 2NF: No partial dependencies...",
    timestamp: "1 week ago",
  },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState("");

  const filtered = mockNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.preview.toLowerCase().includes(search.toLowerCase()),
  );

  const openNote = (note) => {
    setSelected(note);
    setContent(note.preview);
  };

  return (
    <div className="space-y-5 max-w-5xl fade-enter">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2430]">Notes</h1>
          <p className="text-sm text-[#626a7c] mt-0.5">
            Your study notes, organized and searchable.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1f2430] text-white text-[13px] font-medium rounded-xl hover:bg-[#2c3344] transition-colors cursor-pointer clay-btn">
          <Plus size={15} /> New Note
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8992a6]"
        />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-2 text-[13px] bg-white border border-[#d7dce6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d9e3fb] focus:border-[#95acd8] transition placeholder:text-[#9da4b6]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        {/* List */}
        <div className="space-y-2 stagger">
          {filtered.map((note) => (
            <div
              key={note.id}
              onClick={() => openNote(note)}
              className={`card p-3.5 cursor-pointer group transition-all duration-200 ${selected?.id === note.id ? "border-[#aebfe6] bg-[#edf2fd]" : ""}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#d7dce6] text-[#6a7488] flex items-center justify-center mt-0.5 flex-shrink-0">
                  <FileText size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-semibold text-[#2f374a] truncate group-hover:text-[#2b4169] transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-[11px] text-[#666f83] mt-0.5 line-clamp-1">
                    {note.preview}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#878ea0] mt-1">
                    <Clock size={10} /> {note.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-8 text-sm text-[#838b9d]">
              No notes found.
            </p>
          )}
        </div>

        {/* Editor */}
        <div
          className="card overflow-hidden flex flex-col"
          style={{ minHeight: 360 }}
        >
          {selected ? (
            <>
              <div className="px-4 py-3 border-b border-[#e7eaf1]">
                <h3 className="text-[13px] font-semibold text-[#2f374a]">
                  {selected.title}
                </h3>
                <p className="text-[10px] text-[#7f8799] mt-0.5">
                  {selected.timestamp}
                </p>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-4 text-[13px] text-[#2f374a] bg-transparent resize-none focus:outline-none leading-relaxed"
                placeholder="Write something..."
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-[#81899b]">
                Select a note to start editing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
