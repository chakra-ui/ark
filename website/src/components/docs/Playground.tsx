import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Flex, Stack } from '@/panda/jsx'
import { Suspense } from 'react'
import { PlaygroundControls } from './PlaygroundControls'
import { usePlayground } from './usePlayground'

type PlaygroundProps = {
  component: string
}

export const Playground = async (props: PlaygroundProps) => {
  const [Component, controls] = usePlayground('Accordion')

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg="bg.surface"
      minH="40"
      borderRadius="lg"
      boxShadow="sm"
      width="full"
    >
      <Flex justify="center" align="center" flex="1" px={{ base: '4', md: '6' }} py="4">
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </Flex>

      <Flex minW="240px" borderLeftWidth="1px" px={{ base: '4', md: '6' }} pt="4" pb="6">
        <Stack gap="4" flex="1" alignItems="stretch">
          <Text
            className={css({
              fontSize: { base: 'md', lg: 'sm' },
              lineHeight: '1.5rem',
              fontWeight: 'semibold',
            })}
          >
            Properties
          </Text>
          <PlaygroundControls controls={controls} />
        </Stack>
      </Flex>
    </Flex>
  )
}
