interface StatusBadgeProps {
  isAvailable: boolean
}

function StatusBadge({ isAvailable }: StatusBadgeProps) {
  return (
    <span
      className={
        isAvailable
            ? 'rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100'
            : 'rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-200'
      }
    >
      {isAvailable ? 'Open to work' : 'Busy learning'}
    </span>
  )
}

export default StatusBadge