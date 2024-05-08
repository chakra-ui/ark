import { Flex } from 'styled-system/jsx'
import { Demo } from '~/demos/accordion'

export const ComponentPreview = () => {
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
