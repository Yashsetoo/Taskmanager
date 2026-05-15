'use client'

import { useState } from 'react'
import { api, type Task, type TaskStatus } from '@/lib/api'
import { StatusBadge } from './StatusBadge'

interface Props {
  task: Task
  onUpdated: (task: Task) => void
  onDeleted: (id: number) => void
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

export function TaskCard({ task, onUpdated, onDeleted }: Props) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleStatusChange = async (status: TaskStatus) => {
    try {
      const updated = await api.updateTask(task.id, { status })
      onUpdated(updated)
    } catch {
      // silent
    }
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return
    setSaving(true)
    try {
      const updated = await api.updateTask(task.id, {
        title: editTitle.trim(),
        description: editDesc.trim() || undefined,
      })
      onUpdated(updated)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDesc(task.description ?? '')
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return
    setDeleting(true)
    try {
      await api.deleteTask(task.id)
      onDeleted(task.id)
    } finally {
      setDeleting(false)
    }
  }

  const date = new Date(task.created_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className={`task-card p-4 ${task.status === 'done' ? 'opacity-60' : ''}`}>
      {editing ? (
        <div className="space-y-2">
          <input
            className="input-field text-sm font-medium"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="input-field text-sm resize-none"
            rows={3}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description"
          />
          <div className="flex gap-2">
            <button
              className="btn-primary text-xs px-3 py-1.5"
              onClick={handleSaveEdit}
              disabled={saving || !editTitle.trim()}
            >
              {saving ? 'SAVING…' : 'SAVE'}
            </button>
            <button className="btn-ghost" onClick={handleCancelEdit}>
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <StatusBadge status={task.status as TaskStatus} />
              <span className="text-[10px] font-mono text-dim">{date}</span>
            </div>
            <h3
              className={`text-sm font-medium leading-snug mb-1 ${
                task.status === 'done' ? 'line-through text-dim' : 'text-ink'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-dim leading-relaxed">{task.description}</p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <select
              className="select-field"
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="flex gap-1">
              <button
                className="btn-ghost text-[11px] px-2 py-1 border border-muted hover:border-ink"
                onClick={() => setEditing(true)}
              >
                edit
              </button>
              <button
                className="btn-ghost text-[11px] px-2 py-1 border border-muted hover:border-red-400 hover:text-red-500"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? '…' : 'del'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
