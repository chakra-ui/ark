'use client'

import { NumberFlow } from '@ark-ui/react/number-flow'
import { ArrowDownLeftIcon, ArrowUpRightIcon } from 'lucide-react'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { Box, HStack, VStack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'

export const Demo = () => {
  const [value, setValue] = useState(12480.5)
  return (
    <Box width="full" maxW="sm" borderWidth="1px" borderRadius="2xl" p="6" bg="bg.default" boxShadow="sm">
      <HStack justify="space-between" mb="6">
        <span className={css({ textStyle: 'sm', color: 'fg.muted', fontWeight: 'medium' })}>Portfolio balance</span>
        <HStack gap="1.5" className={css({ textStyle: 'xs', color: 'fg.muted' })}>
          <Box w="1.5" h="1.5" borderRadius="full" bg="green.9" /> Live
        </HStack>
      </HStack>
      <VStack alignItems="flex-start" gap="2">
        <NumberFlow.Root
          value={value}
          locale="en-US"
          formatOptions={{ style: 'currency', currency: 'USD' }}
          trend
          stagger="25ms"
          className={css({
            fontSize: '4xl',
            fontWeight: 'semibold',
            letterSpacing: 'tight',
            fontVariantNumeric: 'tabular-nums',
          })}
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
        <p className={css({ textStyle: 'sm', color: 'fg.muted' })}>A little more momentum with every change.</p>
      </VStack>
      <HStack mt="6" gap="2">
        <Button flex="1" variant="outline" size="sm" onClick={() => setValue((value) => value - 125.75)}>
          <ArrowDownLeftIcon /> Withdraw
        </Button>
        <Button flex="1" variant="outline" size="sm" onClick={() => setValue((value) => value + 125.75)}>
          <ArrowUpRightIcon /> Deposit
        </Button>
      </HStack>
    </Box>
  )
}
