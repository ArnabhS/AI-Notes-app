"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, deleteNoteById, editNoteById } from "../services/noteService"
import { Trash2, FileText, RefreshCw, AlertCircle, Edit } from "lucide-react"
import { RiGeminiLine } from "react-icons/ri";
interface Note {
  id: number
  content: string
}

interface NoteListProps {
  onSummarize: (noteContent: string) => void
}

export default function NoteList({ onSummarize }: NoteListProps) {
  const queryClient = useQueryClient()
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newContent, setNewContent] = useState<string>("")

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: getNotes,
  })

  const deleteNote = useMutation({
    mutationFn: deleteNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
  })

  const editNote = useMutation({
    mutationFn: editNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      setEditingNote(null)
    },
  })

  const handleDeleteNote = (id: number) => {
    deleteNote.mutate(id)
    setNoteToDelete(null)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setNewContent(note.content)
  }

  const handleSaveEdit = () => {
    if (editingNote) {
      editNote.mutate({
        id: editingNote.id,
        content: newContent,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-900 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="w-3/4 h-5 bg-neutral-700 animate-pulse rounded"></div>
              <div className="w-8 h-8 bg-neutral-700 animate-pulse rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-500 bg-red-900/20">
        <div className="p-6 flex gap-3 items-center">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-300">Failed to load notes. Please try again later.</p>
          <button
            className="ml-auto px-3 py-1 text-sm border border-neutral-700 text-neutral-300 rounded-md hover:bg-neutral-800 transition-colors"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["notes"] })}
          >
            <RefreshCw className="h-4 w-4 mr-2 inline-block" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  const notes = Array.isArray(data) ? data : []

  if (notes.length === 0) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="flex justify-center">
          <FileText className="h-16 w-16 text-neutral-500" />
        </div>
        <h3 className="text-lg font-medium text-white">No notes yet</h3>
        <p className="text-neutral-400 max-w-sm mx-auto">
          Create your first note to get started. Your notes will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-lg border border-neutral-800 bg-neutral-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {editingNote?.id === note.id ? (
              <div className="w-full">
                <textarea
                  className="w-full p-2 border border-neutral-700 bg-neutral-800 text-white rounded-md"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <div className="flex items-center justify-end gap-2 mt-2">
                  <button
                    className="px-3 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 text-xs border border-neutral-700 text-neutral-300 rounded-md hover:bg-neutral-800"
                    onClick={() => setEditingNote(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="py-1 leading-relaxed text-white max-w-[65%]  text-balance">{note.content}</p>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                className="text-emerald-400 hover:underline text-sm flex items-center gap-1"
                onClick={() => onSummarize(note.content)}
              >
                 <RiGeminiLine /> Summarize with AI
              </button>

              {editingNote?.id === note.id ? null : (
                <>
                  <button
                    className="text-neutral-400 hover:text-emerald-400 hover:bg-emerald-900 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
                    onClick={() => handleEditNote(note)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit note</span>
                  </button>

                  {noteToDelete === note.id ? (
                    <>
                      <button
                        className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="px-3 py-1 text-xs border border-neutral-700 text-neutral-300 rounded-md hover:bg-neutral-800"
                        onClick={() => setNoteToDelete(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-neutral-400 hover:text-red-500 hover:bg-red-900 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
                      onClick={() => setNoteToDelete(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete note</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
