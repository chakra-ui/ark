import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import { DatePicker } from '../'
import './date-picker.css'

const meta: Meta = {
  title: 'DatePicker',
}

export default meta

export const Basic = () => {
  return (
    <DatePicker.Root>
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
              {(api) => (
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
                        {api().weekDays.map((weekDay) => (
                          <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {api().weeks.map((week) => (
                        <DatePicker.TableRow>
                          {week.map((day) => (
                            <DatePicker.TableCell value={day}>
                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.View>
            <DatePicker.View view="month">
              {(api) => (
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
                      {api()
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months) => (
                          <DatePicker.TableRow>
                            {months.map((month) => (
                              <DatePicker.TableCell value={month.value}>
                                <DatePicker.TableCellTrigger>
                                  {month.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.View>
            <DatePicker.View view="year">
              {(api) => (
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
                      {api()
                        .getYearsGrid({ columns: 4 })
                        .map((years) => (
                          <DatePicker.TableRow>
                            {years.map((year) => (
                              <DatePicker.TableCell value={year.value}>
                                <DatePicker.TableCellTrigger>
                                  {year.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

export const Standalone = () => {
  return (
    <DatePicker.Root open={true} closeOnSelect={false}>
      {(api) => (
        <>
          <DatePicker.View view="day">
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
                  {api().weekDays.map((weekDay) => (
                    <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {api().weeks.map((week) => (
                  <DatePicker.TableRow>
                    {week.map((day) => (
                      <DatePicker.TableCell value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.View>
        </>
      )}
    </DatePicker.Root>
  )
}
