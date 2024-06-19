import { Index, Portal } from 'solid-js/web'
import { TimePicker, type TimePickerRootProps } from '../..'

export const ComponentUnderTest = (props: TimePickerRootProps) => {
  return (
    <TimePicker.Root {...props}>
      <TimePicker.Control>
        <TimePicker.Input />
        <TimePicker.Trigger>🗓</TimePicker.Trigger>
        <TimePicker.ClearTrigger>❌</TimePicker.ClearTrigger>
      </TimePicker.Control>
      <Portal>
        <TimePicker.Positioner data-testid="positioner">
          <TimePicker.Content>
            <TimePicker.Context>
              {(api) => (
                <>
                  <TimePicker.Column unit="hour">
                    <TimePicker.Spacer />
                    <Index each={api().getHours()}>
                      {(item) => (
                        <TimePicker.HourCell value={item().value}>
                          {item().label}
                        </TimePicker.HourCell>
                      )}
                    </Index>
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="minute">
                    <TimePicker.Spacer />
                    <Index each={api().getMinutes()}>
                      {(item) => (
                        <TimePicker.MinuteCell value={item().value}>
                          {item().label}
                        </TimePicker.MinuteCell>
                      )}
                    </Index>
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="second">
                    <TimePicker.Spacer />
                    <Index each={api().getSeconds()}>
                      {(item) => (
                        <TimePicker.SecondCell value={item().value}>
                          {item().label}
                        </TimePicker.SecondCell>
                      )}
                    </Index>
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
      </Portal>
    </TimePicker.Root>
  )
}
