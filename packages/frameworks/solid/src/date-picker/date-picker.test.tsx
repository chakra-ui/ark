import { datePickerAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Portal } from 'solid-js/web'
import { getExports, getParts } from '../setup-test'
import { DatePicker, type DatePickerRootProps } from './'

const ComponentUnderTest = (props: DatePickerRootProps) => (
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

describe('Date Picker', () => {
  it.each(getParts(datePickerAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(datePickerAnatomy))('should export %s', async (part) => {
    expect(DatePicker[part]).toBeDefined()
  })

  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  }, 7000)

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  }, 7000)
})
