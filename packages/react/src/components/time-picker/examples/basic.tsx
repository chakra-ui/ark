import { Portal } from '@ark-ui/react/portal'
import { TimePicker } from '@ark-ui/react/time-picker'

export const Basic = () => {
  return (
    <TimePicker.Root>
      <TimePicker.Control>
        <TimePicker.Input />
        <TimePicker.Trigger>🗓</TimePicker.Trigger>
        <TimePicker.ClearTrigger>❌</TimePicker.ClearTrigger>
      </TimePicker.Control>
      <Portal>
        <TimePicker.Positioner>
          <TimePicker.Content>
            <TimePicker.Context>
              {(timepicker) => (
                <>
                  <TimePicker.Column unit="hour">
                    <TimePicker.Spacer />
                    {timepicker.getHours().map((item) => (
                      <TimePicker.Cell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.Cell>
                    ))}
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="minute">
                    <TimePicker.Spacer />
                    {timepicker.getMinutes().map((item) => (
                      <TimePicker.Cell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.Cell>
                    ))}
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="second">
                    <TimePicker.Spacer />
                    {timepicker.getSeconds().map((item) => (
                      <TimePicker.Cell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.Cell>
                    ))}
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
