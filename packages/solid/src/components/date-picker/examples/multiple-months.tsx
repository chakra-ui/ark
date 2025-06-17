import { DatePicker } from '@ark-ui/solid/date-picker'
import { Index, createMemo } from 'solid-js'

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
                      <Index each={datePicker().weekDays}>
                        {(weekDay) => <DatePicker.TableHeader>{weekDay().short}</DatePicker.TableHeader>}
                      </Index>
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    <Index each={datePicker().weeks}>
                      {(week) => (
                        <DatePicker.TableRow>
                          <Index each={week()}>
                            {(day) => (
                              <DatePicker.TableCell value={day()}>
                                <DatePicker.TableCellTrigger>{day().day}</DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            )}
                          </Index>
                        </DatePicker.TableRow>
                      )}
                    </Index>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>

            {/* Second month */}
            <DatePicker.Context>
              {(datePicker) => {
                const offset = createMemo(() => datePicker().getOffset({ months: 1 }))
                return (
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        <Index each={datePicker().weekDays}>
                          {(weekDay) => <DatePicker.TableHeader>{weekDay().short}</DatePicker.TableHeader>}
                        </Index>
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      <Index each={offset().weeks}>
                        {(week) => (
                          <DatePicker.TableRow>
                            <Index each={week()}>
                              {(day) => (
                                <DatePicker.TableCell value={day()} visibleRange={offset().visibleRange}>
                                  <DatePicker.TableCellTrigger>{day().day}</DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              )}
                            </Index>
                          </DatePicker.TableRow>
                        )}
                      </Index>
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
