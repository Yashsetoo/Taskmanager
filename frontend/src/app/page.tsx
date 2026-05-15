'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type Task, type TaskStatus } from '@/lib/api'
import { CreateTaskForm } from '@/components/CreateTaskForm'
import { TaskCard } from '@/components/TaskCard'

const FILTERS: { value: TaskStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.listTasks(filter === 'all' ? undefined : filter)
      setTasks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleCreated = (task: Task) => {
    setTasks((prev) => [task, ...prev])
  }

  const handleUpdated = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  const handleDeleted = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const counts = tasks.reduce(
    (acc, t) => {
      acc[t.status as TaskStatus] = (acc[t.status as TaskStatus] ?? 0) + 1
      return acc
    },
    {} as Record<TaskStatus, number>
  )

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-muted bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono tracking-widest text-dim uppercase mb-1">
              Task Manager
            </p>
            <h1 className="text-2xl font-sans font-light tracking-tight text-ink">
              Your Work, Organised
            </h1>
          </div>
          <div className="flex gap-4 text-right">
            {(['todo', 'in_progress', 'done'] as TaskStatus[]).map((s) => (
              <div key={s} className="text-center">
                <div className="text-xl font-mono font-semibold text-ink">
                  {counts[s] ?? 0}
                </div>
                <div className="text-[10px] font-mono text-dim uppercase tracking-wider">
                  {s === 'in_progress' ? 'active' : s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* Left: Create form */}
        <div className="space-y-6">
          <CreateTaskForm onCreated={handleCreated} />
          <div className="text-[10px] font-mono text-dim text-center">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </div>
        </div>

        {/* Right: Task list */}
        <div>
          {/* Filter tabs */}
          <div className="flex gap-0 border border-muted mb-5 w-fit">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`px-4 py-2 text-[11px] font-mono tracking-widest uppercase transition-colors duration-100 ${
                  filter === f.value
                    ? 'bg-ink text-paper'
                    : 'text-dim hover:text-ink hover:bg-muted'
                }`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Task list */}
          {loading ? (
            <div className="py-16 text-center">
              <p className="text-xs font-mono text-dim tracking-widest">LOADING…</p>
            </div>
          ) : error ? (
            <div className="py-16 text-center border border-red-200 bg-red-50">
              <p className="text-xs font-mono text-red-600">{error}</p>
              <button className="btn-ghost mt-2 text-red-500" onClick={fetchTasks}>
                retry
              </button>
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-muted">
              <p className="text-xs font-mono text-dim tracking-widest">
                {filter === 'all' ? 'NO TASKS YET' : `NO ${filter.toUpperCase()} TASKS`}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdated={handleUpdated}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
