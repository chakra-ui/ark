'use client'
import { Format } from '@ark-ui/react/format'
import { HStack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'

export const Demo = () => {
  return (
    <HStack gap="3">
      <Text>Next departure</Text>
      <Text color="fg.default" fontWeight="medium">
        <Format.Time value="18:47:12" format="12h" />
      </Text>
    </HStack>
  )
}
