"use client"

import type React from "react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/services/noteService"
import { PlusCircle, Loader2 } from "lucide-react"

const NoteForm: React.FC = () => {
  const [content, setContent] = useState("")
  const queryClient = useQueryClient()
  const maxLength = 1000

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      setContent("")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      mutation.mutate({ content })
    }
  }

  const charactersLeft = maxLength - content.length
  const isNearLimit = charactersLeft <= 20
  const isAtLimit = charactersLeft <= 0

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm p-4 mb-6 text-zinc-100">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="note-content" className="block text-sm font-medium text-zinc-300 mb-1">
            New Note
          </label>
          <div className="relative">
            <textarea
              id="note-content"
              className={`w-full min-h-[120px] p-3 bg-zinc-800 border ${
                isAtLimit
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-40 transition-all text-zinc-100`}
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
              required
              maxLength={maxLength}
              disabled={mutation.isPending}
            />
            <div
              className={`absolute bottom-3 right-3 text-xs font-medium ${
                isAtLimit ? "text-red-500" : isNearLimit ? "text-amber-400" : "text-zinc-400"
              }`}
            >
              {charactersLeft} characters left
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-red-500">
            {mutation.isError && <span>Error: Failed to save note. Please try again.</span>}
          </div>
          <button
            type="submit"
            disabled={mutation.isPending || content.trim() === "" || isAtLimit}
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm ${
              mutation.isPending || content.trim() === "" || isAtLimit
                ? "bg-emerald-700 text-gray-100 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
            }`}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Note
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm
