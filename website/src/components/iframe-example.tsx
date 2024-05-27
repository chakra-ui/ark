'use client'
import { useIsClient } from '@uidotdev/usehooks'
import { useTheme } from 'next-themes'
import { Flex } from 'styled-system/jsx'

interface Props {
  baseUrl: string
}

export const IFrameExample = (props: Props) => {
  const { baseUrl } = props
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  if (!isClient) return null
  return (
    <Flex
      minH="md"
      bg="bg.default"
      width="full"
      overflow="hidden"
      mx="auto"
      boxShadow="xl"
      borderRadius="2xl"
    >
      <iframe title="Example" width="100%" src={`${baseUrl}?theme=${resolvedTheme}`} />
    </Flex>
  )
}
