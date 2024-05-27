'use client'
import { useIsClient } from '@uidotdev/usehooks'
import { useTheme } from 'next-themes'

export const IFrameExample = () => {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  if (!isClient) return null
  return (
    <iframe
      title="Example"
      src={`http://localhost:3001/examples/menu/nested?theme=${resolvedTheme}`}
    />
  )
}
