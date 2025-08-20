// Guest ID utility for anonymous users
export function generateGuestId(): string {
  // Create a fingerprint based on browser characteristics
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx!.textBaseline = 'top'
  ctx!.font = '14px Arial'
  ctx!.fillText('Guest fingerprint', 2, 2)
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|')
  
  // Simple hash function
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Add random component for uniqueness
  const randomComponent = Math.random().toString(36).substring(2, 15)
  
  return `guest_${Math.abs(hash).toString(36)}_${randomComponent}`
}

export function getGuestId(): string {
  if (typeof window === 'undefined') {
    return '' // Server-side rendering
  }
  
  const stored = localStorage.getItem('augmentcode_guest_id')
  if (stored) {
    return stored
  }
  
  const newGuestId = generateGuestId()
  localStorage.setItem('augmentcode_guest_id', newGuestId)
  return newGuestId
}

export function clearGuestId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('augmentcode_guest_id')
  }
}
