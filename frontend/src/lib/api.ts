const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  created_at: string
}

export interface CreateTaskPayload {
  title: string
  description?: string
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  status?: TaskStatus
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error ${res.status}: ${text}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  listTasks: (status?: TaskStatus) =>
    request<Task[]>(`/api/tasks${status ? `?status=${status}` : ''}`),

  getTask: (id: number) => request<Task>(`/api/tasks/${id}`),

  createTask: (payload: CreateTaskPayload) =>
    request<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateTask: (id: number, payload: UpdateTaskPayload) =>
    request<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  deleteTask: (id: number) =>
    request<void>(`/api/tasks/${id}`, { method: 'DELETE' }),
}
