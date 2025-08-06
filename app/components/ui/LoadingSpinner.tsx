// components/LoadingSpinner.tsx
'use client'

import { ClipLoader } from 'react-spinners'

type Props = {
  loading?: boolean
  fullscreen?: boolean
  size?: number
  color?: string
}

export default function LoadingSpinner({
  loading = true,
  fullscreen = false,
  size = 50,
  color = "#3b82f6", // azul tailwind
}: Props) {
  if (!loading) return null

  return (
    <div className={`${fullscreen ? 'fixed inset-0 z-50 bg-white/70 flex items-center justify-center' : ''}`}>
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  )
}
