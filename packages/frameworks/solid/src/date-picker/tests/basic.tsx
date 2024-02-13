import { Portal } from 'solid-js/web'
import { DatePicker, type DatePickerRootProps } from '../'

export const ComponentUnderTest = (props: DatePickerRootProps) => (
  <DatePicker.Root {...props}>
    <DatePicker.Label>Label</DatePicker.Label>
    <DatePicker.Control>
      <DatePicker.Input />
      <DatePicker.Trigger>📅</DatePicker.Trigger>
      <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>
    <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>
    <Portal>
      <DatePicker.Positioner data-testid="positioner">
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
