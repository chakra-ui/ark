'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { Flex } from 'styled-system/jsx'

function dashCase(string: string) {
  return string.replace(/[A-Z]/g, ' $&').toLowerCase().trim().split(' ').join('-')
}

export const DemoPreview = ({ id }: { id: string }) => {
  const Demo = useMemo(
    () =>
      dynamic(
        () =>
          import(`~/demos/${dashCase(id)}.demo.tsx`)
            .then((mod) => ({ default: mod.Demo }))
            .catch(() => ({ default: () => <div>Demo not found</div> })),
        { ssr: false, loading: () => <div>Loading...</div> },
      ),
    [id],
  )

  return (
    <Flex
      minH={id === 'NavigationMenu' ? '80' : '40'}
      bg="bg.default"
      borderRadius="lg"
      borderWidth="1px"
      width="full"
      overflow={id === 'NavigationMenu' ? 'visible' : 'hidden'}
      className="not-prose"
      my="12"
    >
      <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }} style={{ width: '100%' }}>
        <Demo />
      </Flex>
    </Flex>
  )
}
