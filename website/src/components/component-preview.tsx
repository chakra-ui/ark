import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { cva } from 'styled-system/css'
import { Flex, Grid, Stack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { getServerContext } from '~/lib/server-context'
import { Heading } from './ui/heading'

interface Props {
  id: string
}

const relatedExamples = [
  {
    id: 'button',
    title: 'Button',
    description: 'A simple button component.',
  },
]

export const ComponentPreview = (props: Props) => {
  const { id } = props
  // @ts-expect-error
  const Demo = dynamic(() => import('~/demos').then((mod) => mod[id]).catch(() => null))

  return (
    <Flex
      minH="40"
      bg="bg.default"
      borderRadius="lg"
      borderWidth="1px"
      width="full"
      overflow="hidden"
      className="not-prose"
      my="12"
    >
      <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }}>
        <Demo />
      </Flex>
    </Flex>
  )
}

const link = cva({
  base: {
    borderRadius: 'lg',
    borderWidth: '1px',
    display: 'flex',

    flexDirection: 'column',
    gap: '1',
    p: '4',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'default',
    _hover: {
      borderColor: 'accent.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'accent.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
  },
})()
