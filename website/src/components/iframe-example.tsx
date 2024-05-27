'use client'
import { useIsClient } from '@uidotdev/usehooks'
import { useTheme } from 'next-themes'

interface Props {
  url: string
}

export const IFrameExample = (props: Props) => {
  const { url } = props
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  if (!isClient) return null
  return <iframe title="Example" width="100%" src={`${url}?theme=${resolvedTheme}`} />
}
