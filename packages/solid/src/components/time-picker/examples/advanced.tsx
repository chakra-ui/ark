import { Time } from '@internationalized/date'
import { Index, Portal } from 'solid-js/web'
import { TimePicker } from '../..'

export const Advanced = () => {
  return (
    <TimePicker.Root
      allowSeconds
      steps={{
        hour: 2,
        minute: 5,
        second: 10,
      }}
      min={new Time(4, 20, 30)}
      max={new Time(20, 10, 10)}
    >
      <TimePicker.Control>
        <TimePicker.Input />
        <TimePicker.Trigger>🗓</TimePicker.Trigger>
        <TimePicker.ClearTrigger>❌</TimePicker.ClearTrigger>
      </TimePicker.Control>
      <Portal>
        <TimePicker.Positioner>
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
