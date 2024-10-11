import { DatePicker, parseDate } from '@ark-ui/solid/date-picker'
import { createSignal } from 'solid-js'
import { Index, Portal } from 'solid-js/web'

export const Controlled = () => {
  const [value, setValue] = createSignal<DatePicker.DateValue[]>([parseDate('2022-01-01')])

  return (
    <DatePicker.Root value={value()} onValueChange={(e) => setValue(e.value)}>
      <DatePicker.Label>Label</DatePicker.Label>

      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger>📅</DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>

      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.YearSelect />
            <DatePicker.MonthSelect />
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(context) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>

                    <DatePicker.Table>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          <Index each={context().weekDays}>
                            {(weekDay) => (
                              <DatePicker.TableHeader>{weekDay().short}</DatePicker.TableHeader>
                            )}
                          </Index>
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>

                      <DatePicker.TableBody>
                        <Index each={context().weeks}>
                          {(week) => (
                            <DatePicker.TableRow>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePicker.TableCell value={day()}>
                                    <DatePicker.TableCellTrigger>
                                      {day().day}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                )}
                              </Index>
                            </DatePicker.TableRow>
                          )}
                        </Index>
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>

            <DatePicker.View view="month">
              <DatePicker.Context>
                {(context) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>

                    <DatePicker.Table>
                      <DatePicker.TableBody>
                        <Index each={context().getMonthsGrid({ columns: 4, format: 'short' })}>
                          {(months) => (
                            <DatePicker.TableRow>
                              <Index each={months()}>
                                {(month) => (
                                  <DatePicker.TableCell value={month().value}>
                                    <DatePicker.TableCellTrigger>
                                      {month().label}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                )}
                              </Index>
                            </DatePicker.TableRow>
                          )}
                        </Index>
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>

            <DatePicker.View view="year">
              <DatePicker.Context>
                {(context) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>

                    <DatePicker.Table>
                      <DatePicker.TableBody>
                        <Index each={context().getYearsGrid({ columns: 4 })}>
                          {(years) => (
                            <DatePicker.TableRow>
                              <Index each={years()}>
                                {(year) => (
                                  <DatePicker.TableCell value={year().value}>
                                    <DatePicker.TableCellTrigger>
                                      {year().label}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                )}
                              </Index>
                            </DatePicker.TableRow>
                          )}
                        </Index>
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
