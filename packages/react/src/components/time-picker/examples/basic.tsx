import { Portal, TimePicker } from '../..'

export const Basic = () => {
  return (
    <TimePicker.Root locale="de-DE">
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
                      <TimePicker.HourCell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.HourCell>
                    ))}
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="minute">
                    <TimePicker.Spacer />
                    {timepicker.getMinutes().map((item) => (
                      <TimePicker.MinuteCell key={item.value} value={item.value}>
                        {item.label}
                      </TimePicker.MinuteCell>
                    ))}
                    <TimePicker.Spacer />
                  </TimePicker.Column>
                  <TimePicker.Column unit="second">
                    <TimePicker.Spacer />
                    {timepicker.getSeconds().map((item) => (
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
      </Portal>
    </TimePicker.Root>
  )
}
