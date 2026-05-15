'use client'

import { useState } from 'react'
import { api, type Task } from '@/lib/api'

interface Props {
  onCreated: (task: Task) => void
}

export function CreateTaskForm({ onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    setError(null)
    try {
      const task = await api.createTask({ title: title.trim(), description: description.trim() || undefined })
      onCreated(task)
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-muted bg-white p-5">
      <h2 className="text-xs font-mono font-semibold tracking-widest text-dim uppercase mb-4">
        New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            className="input-field"
            type="text"
            placeholder="Task title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            className="input-field resize-none"
            rows={3}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-xs font-mono text-red-600">{error}</p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={loading || !title.trim()}>
          {loading ? 'CREATING…' : '+ ADD TASK'}
        </button>
      </form>
    </div>
  )
}
