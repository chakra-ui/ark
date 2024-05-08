'use client'
import dynamic from 'next/dynamic'
import { Flex } from 'styled-system/jsx'

interface Props {
  id: string
}

export const ComponentPreview = (props: Props) => {
  const { id } = props
  // @ts-expect-error
  const Demo = dynamic(() => import('~/demos').then((mod) => mod[id]).catch(() => null))
  return (
    <Flex
      minH="40"
      borderRadius="lg"
      boxShadow="xs"
      width="full"
      overflow="hidden"
      className="not-prose"
    >
      <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }}>
        <Demo />
      </Flex>
    </Flex>
  )
}
