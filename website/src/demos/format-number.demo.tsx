import { Format } from '@ark-ui/react'
import { VStack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'

export const Demo = () => {
  return (
    <VStack gap="1">
      <Heading size="5xl" as="div">
        <Format.Number value={120000} notation="compact" />
      </Heading>
      <Text>downloads per month</Text>
    </VStack>
  )
}
