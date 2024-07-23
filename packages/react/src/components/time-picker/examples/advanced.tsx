import { Portal, TimePicker } from '../..'

export const Advanced = () => {
  return (
    <TimePicker.Root
      allowSeconds
      steps={{
        hour: 2,
        minute: 5,
        second: 10,
      }}
      min="03:00"
      max="11:00"
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
