export function formatTimeAgo(date: string): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffMinutes < 1) return 'now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}hr ago`
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`
  if (diffMonths < 12) return `${diffMonths} months ago`
  return `${diffYears} years ago`
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(date: string): string {
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (seconds < 60) {
    return 'just now'
  }

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]

  for (const interval of intervals) {
    const value = Math.floor(seconds / interval.seconds)
    if (value >= 1) {
      if (value === 1) {
        return `1 ${interval.label} ago`
      } else {
        return `${value} ${interval.label}s ago`
      }
    }
  }

  return 'just now'
}

export const formatCount = (num: number) => {
  // Check for invalid or non-numeric input
  if (typeof num !== 'number' || isNaN(num)) {
    return '0'
  }

  // 🟢 Handle numbers below 1000 directly without decimals
  if (num < 1000) {
    return num.toString()
  }

  const sign = Math.sign(num)
  num = Math.abs(num)

  const suffixes = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ]

  for (let i = 0; i < suffixes.length; i++) {
    if (num >= suffixes[i].value) {
      const formattedNum = num / suffixes[i].value

      // Check if the number has a decimal part
      if (formattedNum % 1 !== 0) {
        return `${sign < 0 ? '-' : ''}${formattedNum.toFixed(2)}${suffixes[i].symbol}`
      }

      // If it's a whole number (e.g., 1.0K), return without a decimal
      return `${sign < 0 ? '-' : ''}${formattedNum}${suffixes[i].symbol}`
    }
  }

  return num.toString()
}
