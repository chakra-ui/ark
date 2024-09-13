'use client'

import { Timer } from '@ark-ui/react'
import { LucidePause, LucidePlay, LucideRotateCcw } from 'lucide-react'
import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'
import { vstack } from 'styled-system/patterns'
import { Button } from '~/components/ui/button'

const TimerItem = (props: Timer.ItemProps) => {
  return (
    <VStack gap="0">
      <Timer.Item
        {...props}
        className={css({
          textStyle: '2xl',
          color: 'fg.default',
          fontVariantNumeric: 'tabular-nums',
        })}
      />
      <p
        className={css({
          textStyle: 'sm',
          color: 'fg.subtle',
        })}
      >
        {props.type}
      </p>
    </VStack>
  )
}

export const Demo = () => (
  <Timer.Root startMs={40 * 60 * 60 * 1000} autoStart countdown className={vstack({ gap: '4' })}>
    <HStack>
      <TimerItem type="days" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItem type="hours" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItem type="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItem type="seconds" />
    </HStack>

    <HStack>
      <Timer.Context>
        {(api) => (
          <>
            <Timer.ActionTrigger action="start" asChild hidden={api.running || api.paused}>
              <Button size="xs" variant="outline">
                <LucidePlay /> Play
              </Button>
            </Timer.ActionTrigger>
            <Timer.ActionTrigger action="resume" asChild hidden={!api.paused}>
              <Button size="xs" variant="outline">
                <LucidePlay /> Resume
              </Button>
            </Timer.ActionTrigger>
            <Timer.ActionTrigger action="pause" asChild hidden={!api.running}>
              <Button size="xs" variant="outline">
                <LucidePause /> Pause
              </Button>
            </Timer.ActionTrigger>
            <Timer.ActionTrigger action="reset" asChild hidden={!api.running && !api.paused}>
              <Button size="xs" variant="outline">
                <LucideRotateCcw /> Reset
              </Button>
            </Timer.ActionTrigger>
          </>
        )}
      </Timer.Context>
    </HStack>
  </Timer.Root>
)
