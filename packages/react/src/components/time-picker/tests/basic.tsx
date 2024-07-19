import { Portal, TimePicker, type TimePickerRootProps } from '../..'

export const ComponentUnderTest = (props: TimePickerRootProps) => {
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
                    {api.getHours().map((item) => (
                      <TimePicker.Cell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.Cell>
                    ))}
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="minute">
                    <TimePicker.Spacer />
                    {api.getMinutes().map((item) => (
                      <TimePicker.Cell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.Cell>
                    ))}
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="second">
                    <TimePicker.Spacer />
                    {api.getSeconds().map((item) => (
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
