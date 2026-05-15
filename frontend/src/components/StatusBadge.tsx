import type { TaskStatus } from '@/lib/api'

const config: Record<TaskStatus, { label: string; classes: string }> = {
  todo: {
    label: 'TODO',
    classes: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  in_progress: {
    label: 'IN PROGRESS',
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  done: {
    label: 'DONE',
    classes: 'bg-green-50 text-green-700 border-green-200',
  },
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const { label, classes } = config[status] ?? config.todo
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest ${classes}`}
    >
      {label}
    </span>
  )
}
