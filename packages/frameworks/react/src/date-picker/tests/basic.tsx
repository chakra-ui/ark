import { DatePicker, type DatePickerRootProps } from '../'
import { Portal } from '../../portal'

export const ComponentUnderTest = (props: DatePickerRootProps) => (
  <DatePicker.Root {...props}>
    <DatePicker.Label>Label</DatePicker.Label>
    <DatePicker.Control>
      <DatePicker.Input />
      <DatePicker.Trigger>📅</DatePicker.Trigger>
      <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>
    <Portal>
      <DatePicker.Positioner data-testid="positioner">
        <DatePicker.Content>
          <DatePicker.PresetTrigger value="last7Days">7 Days</DatePicker.PresetTrigger>
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
                        {context.weekDays.map((weekDay, id) => (
                          <DatePicker.TableHeader key={id}>{weekDay.short}</DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {context.weeks.map((week, id) => (
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
                      {context.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                        <DatePicker.TableRow key={id}>
                          {months.map((month, id) => (
                            <DatePicker.TableCell key={id} value={month.value}>
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
                      {context.getYearsGrid({ columns: 4 }).map((years, id) => (
                        <DatePicker.TableRow key={id}>
                          {years.map((year, id) => (
                            <DatePicker.TableCell key={id} value={year.value}>
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
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </Portal>
  </DatePicker.Root>
)
