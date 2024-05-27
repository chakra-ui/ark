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
      src={`https://ark-plus.vercel.app/examples/popover-tooltip?theme=${resolvedTheme}`}
    />
  )
}
