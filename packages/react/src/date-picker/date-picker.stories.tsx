import type { Meta } from '@storybook/react'
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerColumnHeader,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayCell,
  DatePickerDayCellTrigger,
  DatePickerGrid,
  DatePickerInput,
  DatePickerMonthCell,
  DatePickerMonthCellTrigger,
  DatePickerMonthSelect,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerViewTrigger,
  DatePickerYearCell,
  DatePickerYearCellTrigger,
  DatePickerYearSelect,
} from './'
import './date-picker.css'

type DatePickerType = typeof DatePicker

const meta: Meta<DatePickerType> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default meta

export const Basic = () => (
  <DatePicker>
    {(api) => (
      <>
        <DatePickerControl>
          <span>View mode: {api.view}</span>
          <DatePickerInput />
          <DatePickerTrigger>🗓</DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <DatePickerContent>
          <DatePickerYearSelect />
          <DatePickerMonthSelect />
          <div>
            <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
            <DatePickerViewTrigger>
              {api.view === 'day' && api.visibleRangeText.start}
              {api.view === 'month' && api.visibleRange.start.year}
              {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
            </DatePickerViewTrigger>
            <DatePickerNextTrigger>Next</DatePickerNextTrigger>
          </div>
          {api.view === 'day' && (
            <DatePickerGrid>
              <DatePickerRowHeader>
                {api.weekDays.map((day, i) => (
                  <DatePickerColumnHeader key={i} aria-label={day.long}>
                    {day.narrow}
                  </DatePickerColumnHeader>
                ))}
              </DatePickerRowHeader>
              <DatePickerRowGroup>
                {api.weeks.map((week, id) => (
                  <DatePickerRow key={id}>
                    {week.map((day, id) => (
                      <DatePickerDayCell key={id} value={day}>
                        <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                      </DatePickerDayCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
          {api.view === 'month' && (
            <DatePickerGrid>
              <DatePickerRowGroup>
                {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                  <DatePickerRow key={row}>
                    {months.map((month, index) => (
                      <DatePickerMonthCell key={index} value={month.value}>
                        <DatePickerMonthCellTrigger>{month.label}</DatePickerMonthCellTrigger>
                      </DatePickerMonthCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
          {api.view === 'year' && (
            <DatePickerGrid>
              <DatePickerRowGroup>
                {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                  <DatePickerRow key={row}>
                    {years.map((year, index) => (
                      <DatePickerYearCell key={index} value={year.value}>
                        <DatePickerYearCellTrigger>{year.label}</DatePickerYearCellTrigger>
                      </DatePickerYearCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
        </DatePickerContent>
      </>
    )}
  </DatePicker>
)

export const RangeWithSingleGrid = () => (
  <DatePicker selectionMode="range">
    {(api) => (
      <>
        <DatePickerControl>
          <span>View mode: {api.view}</span>
          <DatePickerInput />
          <DatePickerTrigger>🗓</DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <DatePickerContent>
          <DatePickerYearSelect />
          <DatePickerMonthSelect />
          <div>
            <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
            <DatePickerViewTrigger>
              {api.view === 'day' && api.visibleRangeText.start}
              {api.view === 'month' && api.visibleRange.start.year}
              {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
            </DatePickerViewTrigger>
            <DatePickerNextTrigger>Next</DatePickerNextTrigger>
          </div>
          {api.view === 'day' && (
            <DatePickerGrid>
              <DatePickerRowHeader>
                {api.weekDays.map((day, i) => (
                  <DatePickerColumnHeader key={i} aria-label={day.long}>
                    {day.narrow}
                  </DatePickerColumnHeader>
                ))}
              </DatePickerRowHeader>
              <DatePickerRowGroup>
                {api.weeks.map((week, id) => (
                  <DatePickerRow key={id}>
                    {week.map((day, id) => (
                      <DatePickerDayCell key={id} value={day}>
                        <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                      </DatePickerDayCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
          {api.view === 'month' && (
            <DatePickerGrid>
              <DatePickerRowGroup>
                {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                  <DatePickerRow key={row}>
                    {months.map((month, index) => (
                      <DatePickerMonthCell key={index} value={month.value}>
                        <DatePickerMonthCellTrigger>{month.label}</DatePickerMonthCellTrigger>
                      </DatePickerMonthCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
          {api.view === 'year' && (
            <DatePickerGrid>
              <DatePickerRowGroup>
                {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                  <DatePickerRow key={row}>
                    {years.map((year, index) => (
                      <DatePickerYearCell key={index} value={year.value}>
                        <DatePickerYearCellTrigger>{year.label}</DatePickerYearCellTrigger>
                      </DatePickerYearCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
        </DatePickerContent>
      </>
    )}
  </DatePicker>
)

export const RangeWithTwoGrids = () => (
  <DatePicker selectionMode="range" numOfMonths={2}>
    {(api) => {
      const offset = api.getOffset(1)
      return (
        <>
          <DatePickerControl>
            <span>View mode: {api.view}</span>
            <DatePickerInput />
            <DatePickerTrigger>🗓</DatePickerTrigger>
            <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
          </DatePickerControl>
          <DatePickerContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
              <time>{api.visibleRangeText.start}</time>
              <time>{api.visibleRangeText.end}</time>
              <DatePickerNextTrigger>Next</DatePickerNextTrigger>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
              <DatePickerGrid>
                <DatePickerRowHeader>
                  {api.weekDays.map((day, i) => (
                    <DatePickerColumnHeader key={i} aria-label={day.long}>
                      {day.narrow}
                    </DatePickerColumnHeader>
                  ))}
                </DatePickerRowHeader>
                <DatePickerRowGroup>
                  {api.weeks.map((week, id) => (
                    <DatePickerRow key={id}>
                      {week.map((day, id) => (
                        <DatePickerDayCell key={id} value={day}>
                          <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                        </DatePickerDayCell>
                      ))}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>

              <DatePickerGrid>
                <DatePickerRowHeader>
                  {api.weekDays.map((day, i) => (
                    <DatePickerColumnHeader key={i} aria-label={day.long}>
                      {day.narrow}
                    </DatePickerColumnHeader>
                  ))}
                </DatePickerRowHeader>
                <DatePickerRowGroup>
                  {offset.weeks.map((week, id) => (
                    <DatePickerRow key={id}>
                      {week.map((day, id) => (
                        <DatePickerDayCell key={id} value={day} offset={offset}>
                          <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                        </DatePickerDayCell>
                      ))}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>
            </div>
          </DatePickerContent>
        </>
      )
    }}
  </DatePicker>
)
