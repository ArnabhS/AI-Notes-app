"use client";

import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";
import SummarizeModal from "@/components/SummarizeModal";
import { useState } from "react";


export default function Notes() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null)

  return (
    <main className="container mx-auto px-4 py-6 max-w-[80%]">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100 mt-5">Your Notes</h1>
      <NoteForm />
      <NoteList onSummarize={(noteContent) => setSelectedNote(noteContent)} />
      {selectedNote && (
        <SummarizeModal
          noteContent={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
      
    </main>
  );
}
