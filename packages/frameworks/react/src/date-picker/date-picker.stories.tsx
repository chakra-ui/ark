import type { Meta } from '@storybook/react'
import { Portal } from '../portal'
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
          <span>View mode: {api.view}</span>
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
                  {api.view === 'day' && api.visibleRangeText.start}
                  {api.view === 'month' && api.visibleRange.start.year}
                  {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </div>
              {api.view === 'day' && (
                <DatePicker.Grid>
                  <DatePicker.RowHeader>
                    {api.weekDays.map((day, i) => (
                      <DatePicker.ColumnHeader key={i} aria-label={day.long}>
                        {day.narrow}
                      </DatePicker.ColumnHeader>
                    ))}
                  </DatePicker.RowHeader>
                  <DatePicker.RowGroup>
                    {api.weeks.map((week, id) => (
                      <DatePicker.Row key={id}>
                        {week.map((day, id) => (
                          <DatePicker.DayCell key={id} value={day}>
                            <DatePicker.DayCellTrigger>{day.day}</DatePicker.DayCellTrigger>
                          </DatePicker.DayCell>
                        ))}
                      </DatePicker.Row>
                    ))}
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              )}
              {api.view === 'month' && (
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                      <DatePicker.Row key={row}>
                        {months.map((month, index) => (
                          <DatePicker.MonthCell key={index} value={month.value}>
                            <DatePicker.MonthCellTrigger>{month.label}</DatePicker.MonthCellTrigger>
                          </DatePicker.MonthCell>
                        ))}
                      </DatePicker.Row>
                    ))}
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              )}
              {api.view === 'year' && (
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                      <DatePicker.Row key={row}>
                        {years.map((year, index) => (
                          <DatePicker.YearCell key={index} value={year.value}>
                            <DatePicker.YearCellTrigger>{year.label}</DatePicker.YearCellTrigger>
                          </DatePicker.YearCell>
                        ))}
                      </DatePicker.Row>
                    ))}
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              )}
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
          <span>View mode: {api.view}</span>
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
                  {api.view === 'day' && api.visibleRangeText.start}
                  {api.view === 'month' && api.visibleRange.start.year}
                  {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </div>
              {api.view === 'day' && (
                <DatePicker.Grid>
                  <DatePicker.RowHeader>
                    {api.weekDays.map((day, i) => (
                      <DatePicker.ColumnHeader key={i} aria-label={day.long}>
                        {day.narrow}
                      </DatePicker.ColumnHeader>
                    ))}
                  </DatePicker.RowHeader>
                  <DatePicker.RowGroup>
                    {api.weeks.map((week, id) => (
                      <DatePicker.Row key={id}>
                        {week.map((day, id) => (
                          <DatePicker.DayCell key={id} value={day}>
                            <DatePicker.DayCellTrigger>{day.day}</DatePicker.DayCellTrigger>
                          </DatePicker.DayCell>
                        ))}
                      </DatePicker.Row>
                    ))}
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              )}
              {api.view === 'month' && (
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                      <DatePicker.Row key={row}>
                        {months.map((month, index) => (
                          <DatePicker.MonthCell key={index} value={month.value}>
                            <DatePicker.MonthCellTrigger>{month.label}</DatePicker.MonthCellTrigger>
                          </DatePicker.MonthCell>
                        ))}
                      </DatePicker.Row>
                    ))}
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              )}
              {api.view === 'year' && (
                <DatePicker.Grid>
                  <DatePicker.RowGroup>
                    {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                      <DatePicker.Row key={row}>
                        {years.map((year, index) => (
                          <DatePicker.YearCell key={index} value={year.value}>
                            <DatePicker.YearCellTrigger>{year.label}</DatePicker.YearCellTrigger>
                          </DatePicker.YearCell>
                        ))}
                      </DatePicker.Row>
                    ))}
                  </DatePicker.RowGroup>
                </DatePicker.Grid>
              )}
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </>
    )}
  </DatePicker.Root>
)

export const RangeWithTwoGrids = () => (
  <DatePicker.Root selectionMode="range" numOfMonths={2}>
    {(api) => {
      const offset = api.getOffset(1)
      return (
        <>
          <DatePicker.Control>
            <span>View mode: {api.view}</span>
            <DatePicker.Input />
            <DatePicker.Trigger>🗓</DatePicker.Trigger>
            <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                  <time>{api.visibleRangeText.start}</time>
                  <time>{api.visibleRangeText.end}</time>
                  <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                  <DatePicker.Grid>
                    <DatePicker.RowHeader>
                      {api.weekDays.map((day, i) => (
                        <DatePicker.ColumnHeader key={i} aria-label={day.long}>
                          {day.narrow}
                        </DatePicker.ColumnHeader>
                      ))}
                    </DatePicker.RowHeader>
                    <DatePicker.RowGroup>
                      {api.weeks.map((week, id) => (
                        <DatePicker.Row key={id}>
                          {week.map((day, id) => (
                            <DatePicker.DayCell key={id} value={day}>
                              <DatePicker.DayCellTrigger>{day.day}</DatePicker.DayCellTrigger>
                            </DatePicker.DayCell>
                          ))}
                        </DatePicker.Row>
                      ))}
                    </DatePicker.RowGroup>
                  </DatePicker.Grid>

                  <DatePicker.Grid>
                    <DatePicker.RowHeader>
                      {api.weekDays.map((day, i) => (
                        <DatePicker.ColumnHeader key={i} aria-label={day.long}>
                          {day.narrow}
                        </DatePicker.ColumnHeader>
                      ))}
                    </DatePicker.RowHeader>
                    <DatePicker.RowGroup>
                      {offset.weeks.map((week, id) => (
                        <DatePicker.Row key={id}>
                          {week.map((day, id) => (
                            <DatePicker.DayCell key={id} value={day} offset={offset}>
                              <DatePicker.DayCellTrigger>{day.day}</DatePicker.DayCellTrigger>
                            </DatePicker.DayCell>
                          ))}
                        </DatePicker.Row>
                      ))}
                    </DatePicker.RowGroup>
                  </DatePicker.Grid>
                </div>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </>
      )
    }}
  </DatePicker.Root>
)
