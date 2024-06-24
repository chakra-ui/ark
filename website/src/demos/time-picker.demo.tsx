'use client'
import { CalendarIcon, XIcon } from 'lucide-react'
import { HStack } from 'styled-system/jsx'
import { IconButton, Input, TimePicker } from '~/components/ui'

export const Demo = (props: TimePicker.RootProps) => {
  return (
    <TimePicker.Root {...props}>
      <TimePicker.Label>Time Picker</TimePicker.Label>
      <TimePicker.Control>
        <HStack>
          <TimePicker.Input asChild>
            <Input />
          </TimePicker.Input>
          <TimePicker.Trigger>
            <IconButton variant="outline" aria-label="Open time picker">
              <CalendarIcon />
            </IconButton>
          </TimePicker.Trigger>
          <TimePicker.ClearTrigger>
            <IconButton variant="outline" aria-label="Clear time picker">
              <XIcon />
            </IconButton>
          </TimePicker.ClearTrigger>
        </HStack>
      </TimePicker.Control>
      <TimePicker.Positioner>
        <TimePicker.Content>
          <TimePicker.Context>
            {(api) => (
              <>
                <TimePicker.Column unit="hour">
                  <TimePicker.Spacer />
                  {api.getHours().map((item) => (
                    <TimePicker.HourCell key={item.value} value={item.value}>
                      {item.label}
                    </TimePicker.HourCell>
                  ))}
                  <TimePicker.Spacer />
                </TimePicker.Column>
                <TimePicker.Column unit="minute">
                  <TimePicker.Spacer />
                  {api.getMinutes().map((item) => (
                    <TimePicker.MinuteCell key={item.value} value={item.value}>
                      {item.label}
                    </TimePicker.MinuteCell>
                  ))}
                  <TimePicker.Spacer />
                </TimePicker.Column>
                <TimePicker.Column unit="second">
                  <TimePicker.Spacer />
                  {api.getSeconds().map((item) => (
                    <TimePicker.SecondCell key={item.value} value={item.value}>
                      {item.label}
                    </TimePicker.SecondCell>
                  ))}
                  <TimePicker.Spacer />
                </TimePicker.Column>
                <TimePicker.Column unit="period">
                  <TimePicker.PeriodCell value="am">AM</TimePicker.PeriodCell>
                  <TimePicker.PeriodCell value="pm">PM</TimePicker.PeriodCell>
                </TimePicker.Column>
              </>
            )}
          </TimePicker.Context>
        </TimePicker.Content>
      </TimePicker.Positioner>
    </TimePicker.Root>
  )
}
