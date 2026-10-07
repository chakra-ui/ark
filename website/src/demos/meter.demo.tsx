'use client'

import { Meter } from '@ark-ui/react/meter'
import { css } from 'styled-system/css'
import { Box, Stack } from 'styled-system/jsx'

const resources = [
  { label: 'CPU', value: 34 },
  { label: 'Memory', value: 72 },
  { label: 'Disk', value: 93 },
]

const rootStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'baseline',
  gap: '2',
})

const trackStyles = css({
  gridColumn: '1 / -1',
  height: '2',
  borderRadius: 'full',
  bg: 'bg.emphasized',
  overflow: 'hidden',
})

const indicatorStyles = css({
  height: 'full',
  borderRadius: 'full',
  transition: 'width 0.4s',
  '&[data-state=optimal]': { bg: 'fg.success' },
  '&[data-state=suboptimal]': { bg: 'fg.warning' },
  '&[data-state=least-optimal]': { bg: 'fg.error' },
})

export const Demo = () => (
  <Box width="full" maxW="xs" borderWidth="1px" borderRadius="2xl" p="6" bg="bg.default" boxShadow="sm">
    <p className={css({ textStyle: 'sm', fontWeight: 'semibold', mb: '5' })}>System resources</p>
    <Stack gap="5">
      {resources.map((resource) => (
        <Meter.Root
          key={resource.label}
          className={rootStyles}
          defaultValue={resource.value}
          low={60}
          high={85}
          optimum={0}
        >
          <Meter.Label className={css({ textStyle: 'sm', color: 'fg.default' })}>{resource.label}</Meter.Label>
          <Meter.ValueText
            className={css({ textStyle: 'sm', color: 'fg.muted', fontVariantNumeric: 'tabular-nums' })}
          />
          <Meter.Track className={trackStyles}>
            <Meter.Indicator className={indicatorStyles} />
          </Meter.Track>
        </Meter.Root>
      ))}
    </Stack>
  </Box>
)
