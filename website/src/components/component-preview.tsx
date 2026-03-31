import { Suspense, lazy, useMemo } from 'react'
import { Flex } from 'styled-system/jsx'
import { ExamplesPreview } from './examples-preview'

interface Props {
  id: string
}

function dashCase(string: string) {
  return string.replace(/[A-Z]/g, ' $&').toLowerCase().trim().split(' ').join('-')
}

export const ComponentPreview = (props: Props) => {
  const { id } = props

  const Demo = useMemo(() => {
    return lazy(() =>
      import(`~/demos/${dashCase(id)}.demo.tsx`)
        .then((mod) => ({ default: mod.Demo }))
        .catch((error) => {
          console.error(`Failed to load demo for ${id}:`, error)
          return { default: () => <div>Demo not found</div> }
        }),
    )
  }, [id])

  return (
    <>
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
        <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }} style={{ width: '100%' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Demo />
          </Suspense>
        </Flex>
      </Flex>
      <ExamplesPreview />
    </>
  )
}
