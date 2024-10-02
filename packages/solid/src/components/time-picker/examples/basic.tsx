import { TimePicker } from '@ark-ui/solid/time-picker'
import { Index, Portal } from 'solid-js/web'

export const Basic = (props: TimePicker.RootProps) => {
  return (
    <TimePicker.Root {...props}>
      <TimePicker.Control>
        <TimePicker.Label>Time Picker</TimePicker.Label>
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
                        <TimePicker.Cell value={item().value}>{item().label}</TimePicker.Cell>
                      )}
                    </Index>
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="minute">
                    <TimePicker.Spacer />
                    <Index each={api().getMinutes()}>
                      {(item) => (
                        <TimePicker.Cell value={item().value}>{item().label}</TimePicker.Cell>
                      )}
                    </Index>
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="second">
                    <TimePicker.Spacer />
                    <Index each={api().getSeconds()}>
                      {(item) => (
                        <TimePicker.Cell value={item().value}>{item().label}</TimePicker.Cell>
                      )}
                    </Index>
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="period">
                    <TimePicker.Cell value="am">AM</TimePicker.Cell>
                    <TimePicker.Cell value="pm">PM</TimePicker.Cell>
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
