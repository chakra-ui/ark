import { Index, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import { DatePicker } from './'
import './date-picker.css'

type DatePickerType = typeof DatePicker

const meta: Meta<DatePickerType> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default meta

export const Basic = () => (
  <DatePicker.Root>
    {(api) => (
      <>
        <DatePicker.Control>
          <span>View mode: {api().view}</span>
          <DatePicker.Input />
          <DatePicker.Trigger>🗓</DatePicker.Trigger>
          <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.YearSelect />
              <DatePicker.MonthSelect />
              <div>
                <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger>
                  <Show when={api().view === 'day'}>{api().visibleRangeText.start}</Show>
                  <Show when={api().view === 'month'}>{api().visibleRange.start.year}</Show>
                  <Show when={api().view === 'year'}>
                    {api().getDecade().start} - {api().getDecade().end}
                  </Show>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </div>
              <Show when={api().view === 'day'}>
                <DatePicker.Grid>
                  <DatePicker.RowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePicker.ColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePicker.ColumnHeader>
                      )}
                    </Index>
                  </DatePicker.RowHeader>
                  <DatePicker.RowGroup>
                    <Index each={api().weeks}>
                      {(week) => (
                        <DatePicker.Row>
                          <Index each={week()}>
                            {(day) => (
                              <DatePicker.DayCell value={day()}>
                                <DatePicker.DayCellTrigger>{day().day}</DatePicker.DayCellTrigger>
                              </DatePicker.DayCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </Show>
              <Show when={api().view === 'month'}>
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    <Index each={api().getMonthsGrid({ columns: 4, format: 'long' })}>
                      {(months) => (
                        <DatePicker.Row>
                          <Index each={months()}>
                            {(month) => (
                              <DatePicker.MonthCell value={month().value}>
                                <DatePicker.MonthCellTrigger>
                                  {month().label}
                                </DatePicker.MonthCellTrigger>
                              </DatePicker.MonthCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </Show>
              <Show when={api().view === 'year'}>
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    <Index each={api().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePicker.Row>
                          <Index each={years()}>
                            {(year) => (
                              <DatePicker.YearCell value={year().value}>
                                <DatePicker.YearCellTrigger>
                                  {year().label}
                                </DatePicker.YearCellTrigger>
                              </DatePicker.YearCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </Show>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </>
    )}
  </DatePicker.Root>
)

export const RangeWithSingleGrid = () => (
  <DatePicker.Root selectionMode="range">
    {(api) => (
      <>
        <DatePicker.Control>
          <span>View mode: {api().view}</span>
          <DatePicker.Input />
          <DatePicker.Trigger>🗓</DatePicker.Trigger>
          <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
                <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger>
                  <Show when={api().view === 'day'}>{api().visibleRangeText.start}</Show>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </div>
              <DatePicker.YearSelect />
              <DatePicker.MonthSelect />
              <div>
                <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger>
                  <Show when={api().view === 'day'}>{api().visibleRangeText.start}</Show>
                  <Show when={api().view === 'month'}>{api().visibleRange.start.year}</Show>
                  <Show when={api().view === 'year'}>
                    {api().getDecade().start} - {api().getDecade().end}
                  </Show>
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </div>
              <Show when={api().view === 'day'}>
                <DatePicker.Grid>
                  <DatePicker.RowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePicker.ColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePicker.ColumnHeader>
                      )}
                    </Index>
                  </DatePicker.RowHeader>
                  <DatePicker.RowGroup>
                    <Index each={api().weeks}>
                      {(week) => (
                        <DatePicker.Row>
                          <Index each={week()}>
                            {(day) => (
                              <DatePicker.DayCell value={day()}>
                                <DatePicker.DayCellTrigger>{day().day}</DatePicker.DayCellTrigger>
                              </DatePicker.DayCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </Show>
              <Show when={api().view === 'month'}>
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    <Index each={api().getMonthsGrid({ columns: 4, format: 'short' })}>
                      {(months) => (
                        <DatePicker.Row>
                          <Index each={months()}>
                            {(month) => (
                              <DatePicker.MonthCell value={month().value}>
                                <DatePicker.MonthCellTrigger>
                                  {month().label}
                                </DatePicker.MonthCellTrigger>
                              </DatePicker.MonthCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </Show>
              <Show when={api().view === 'year'}>
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    <Index each={api().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePicker.Row>
                          <Index each={years()}>
                            {(year) => (
                              <DatePicker.YearCell value={year().value}>
                                <DatePicker.YearCellTrigger>
                                  {year().label}
                                </DatePicker.YearCellTrigger>
                              </DatePicker.YearCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </Show>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </>
    )}
  </DatePicker.Root>
)

export const RangeWithTwoGrids = () => (
  <DatePicker.Root selectionMode="range" numOfMonths={2}>
    {(api) => (
      <>
        <DatePicker.Control>
          <span>View mode: {api().view}</span>
          <DatePicker.Input />
          <DatePicker.Trigger>🗓</DatePicker.Trigger>
          <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
                <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                <time>{api().visibleRangeText.start}</time>
                <time>{api().visibleRangeText.end}</time>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </div>
              <div style={{ display: 'flex', 'justify-content': 'space-between', gap: '24px' }}>
                <DatePicker.Grid>
                  <DatePicker.RowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePicker.ColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePicker.ColumnHeader>
                      )}
                    </Index>
                  </DatePicker.RowHeader>
                  <DatePicker.RowGroup>
                    <Index each={api().weeks}>
                      {(week) => {
                        return (
                          <DatePicker.Row>
                            <Index each={week()}>
                              {(day) => (
                                <DatePicker.DayCell value={day()}>
                                  <DatePicker.DayCellTrigger>{day().day}</DatePicker.DayCellTrigger>
                                </DatePicker.DayCell>
                              )}
                            </Index>
                          </DatePicker.Row>
                        )
                      }}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>

                <DatePicker.Grid>
                  <DatePicker.RowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePicker.ColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePicker.ColumnHeader>
                      )}
                    </Index>
                  </DatePicker.RowHeader>
                  <DatePicker.RowGroup>
                    <Index each={api().getOffset(1).weeks}>
                      {(week) => (
                        <DatePicker.Row>
                          <Index each={week()}>
                            {(day) => (
                              <DatePicker.DayCell value={day()} offset={api().getOffset(1)}>
                                <DatePicker.DayCellTrigger>{day().day}</DatePicker.DayCellTrigger>
                              </DatePicker.DayCell>
                            )}
                          </Index>
                        </DatePicker.Row>
                      )}
                    </Index>
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              </div>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </>
    )}
  </DatePicker.Root>
)
