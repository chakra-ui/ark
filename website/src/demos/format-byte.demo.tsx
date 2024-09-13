import { Format } from '@ark-ui/react'
import { VStack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'

export const Demo = () => {
  return (
    <VStack gap="1">
      <Text>File Size</Text>
      <Heading size="2xl" as="div">
        <Format.Byte value={120000} unit="byte" />
      </Heading>
    </VStack>
  )
}
