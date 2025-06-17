import { DatePicker } from '@ark-ui/react/date-picker'

export const MultipleMonths = () => {
  return (
    <DatePicker.Root numOfMonths={2}>
      <DatePicker.Label>Label</DatePicker.Label>

      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Trigger>📅</DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>

      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.YearSelect />
          <DatePicker.MonthSelect />
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
            <DatePicker.RangeText />
            <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
          </DatePicker.ViewControl>

          <div style={{ display: 'flex', gap: '10px' }}>
            {/* First month */}
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table>
                  <DatePicker.TableHead>
                    <DatePicker.TableRow>
                      {datePicker.weekDays.map((weekDay, id) => (
                        <DatePicker.TableHeader key={id}>{weekDay.short}</DatePicker.TableHeader>
                      ))}
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    {datePicker.weeks.map((week, id) => (
                      <DatePicker.TableRow key={id}>
                        {week.map((day, id) => (
                          <DatePicker.TableCell key={id} value={day}>
                            <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>

            {/* Second month */}
            <DatePicker.Context>
              {(datePicker) => {
                const offset = datePicker.getOffset({ months: 1 })
                return (
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {datePicker.weekDays.map((weekDay, id) => (
                          <DatePicker.TableHeader key={id}>{weekDay.short}</DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {offset.weeks.map((week, id) => (
                        <DatePicker.TableRow key={id}>
                          {week.map((day, id) => (
                            <DatePicker.TableCell key={id} value={day} visibleRange={offset.visibleRange}>
                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                )
              }}
            </DatePicker.Context>
          </div>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}
