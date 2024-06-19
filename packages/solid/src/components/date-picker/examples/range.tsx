import { Index, createMemo } from 'solid-js'
import { Portal } from 'solid-js/web'
import { DatePicker } from '../..'

export const Range = () => {
  return (
    <DatePicker.Root selectionMode="range" numOfMonths={2}>
      <DatePicker.Label>Label</DatePicker.Label>

      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.Trigger>📅</DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>

      <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>

      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.YearSelect />
            <DatePicker.MonthSelect />

            <div style={{ display: 'flex', gap: '10px' }}>
              <DatePicker.Context>
                {(context) => (
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
                )}
              </DatePicker.Context>

              <DatePicker.Context>
                {(context) => {
                  const offset = createMemo(() => context().getOffset({ months: 1 }))
                  return (
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
                        <Index each={offset().weeks}>
                          {(week) => (
                            <DatePicker.TableRow>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePicker.TableCell
                                    value={day()}
                                    visibleRange={offset().visibleRange}
                                  >
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
                  )
                }}
              </DatePicker.Context>
            </div>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
