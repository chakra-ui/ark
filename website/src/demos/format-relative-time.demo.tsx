'use client'
import { Format } from '@ark-ui/react/format'
import { Box, HStack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'

export const Demo = () => {
  return (
    <HStack gap="3">
      <Text>Last updated</Text>
      <Box color="fg.default" fontWeight="medium">
        <Format.RelativeTime value={new Date('2025-05-05')} />
      </Box>
    </HStack>
  )
}
