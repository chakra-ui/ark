'use client'
import { useIsClient } from '@uidotdev/usehooks'
import { useTheme } from 'next-themes'
import { Box, Flex } from 'styled-system/jsx'

export const IFrameExample = () => {
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
      <iframe
        title="Example"
        width="100%"
        src={`http://localhost:3001/examples/menu/nested?theme=${resolvedTheme}`}
      />
    </Flex>
  )
}
