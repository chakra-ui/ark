import { Index, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
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
  DatePickerPositioner,
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
          <span>View mode: {api().view}</span>
          <DatePickerInput />
          <DatePickerTrigger>🗓</DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <Portal>
          <DatePickerPositioner>
            <DatePickerContent>
              <DatePickerYearSelect />
              <DatePickerMonthSelect />
              <div>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <DatePickerViewTrigger>
                  <Show when={api().view === 'day'}>{api().visibleRangeText.start}</Show>
                  <Show when={api().view === 'month'}>{api().visibleRange.start.year}</Show>
                  <Show when={api().view === 'year'}>
                    {api().getDecade().start} - {api().getDecade().end}
                  </Show>
                </DatePickerViewTrigger>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
              <Show when={api().view === 'day'}>
                <DatePickerGrid>
                  <DatePickerRowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePickerColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePickerColumnHeader>
                      )}
                    </Index>
                  </DatePickerRowHeader>
                  <DatePickerRowGroup>
                    <Index each={api().weeks}>
                      {(week) => (
                        <DatePickerRow>
                          <Index each={week()}>
                            {(day) => (
                              <DatePickerDayCell value={day()}>
                                <DatePickerDayCellTrigger>{day().day}</DatePickerDayCellTrigger>
                              </DatePickerDayCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Show>
              <Show when={api().view === 'month'}>
                <DatePickerGrid>
                  <DatePickerRowGroup>
                    <Index each={api().getMonthsGrid({ columns: 4, format: 'long' })}>
                      {(months) => (
                        <DatePickerRow>
                          <Index each={months()}>
                            {(month) => (
                              <DatePickerMonthCell value={month().value}>
                                <DatePickerMonthCellTrigger>
                                  {month().label}
                                </DatePickerMonthCellTrigger>
                              </DatePickerMonthCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Show>
              <Show when={api().view === 'year'}>
                <DatePickerGrid>
                  <DatePickerRowGroup>
                    <Index each={api().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePickerRow>
                          <Index each={years()}>
                            {(year) => (
                              <DatePickerYearCell value={year().value}>
                                <DatePickerYearCellTrigger>
                                  {year().label}
                                </DatePickerYearCellTrigger>
                              </DatePickerYearCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Show>
            </DatePickerContent>
          </DatePickerPositioner>
        </Portal>
      </>
    )}
  </DatePicker>
)

export const RangeWithSingleGrid = () => (
  <DatePicker selectionMode="range">
    {(api) => (
      <>
        <DatePickerControl>
          <span>View mode: {api().view}</span>
          <DatePickerInput />
          <DatePickerTrigger>🗓</DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <Portal>
          <DatePickerPositioner>
            <DatePickerContent>
              <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <DatePickerViewTrigger>
                  <Show when={api().view === 'day'}>{api().visibleRangeText.start}</Show>
                </DatePickerViewTrigger>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
              <DatePickerYearSelect />
              <DatePickerMonthSelect />
              <div>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <DatePickerViewTrigger>
                  <Show when={api().view === 'day'}>{api().visibleRangeText.start}</Show>
                  <Show when={api().view === 'month'}>{api().visibleRange.start.year}</Show>
                  <Show when={api().view === 'year'}>
                    {api().getDecade().start} - {api().getDecade().end}
                  </Show>
                </DatePickerViewTrigger>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
              <Show when={api().view === 'day'}>
                <DatePickerGrid>
                  <DatePickerRowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePickerColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePickerColumnHeader>
                      )}
                    </Index>
                  </DatePickerRowHeader>
                  <DatePickerRowGroup>
                    <Index each={api().weeks}>
                      {(week) => (
                        <DatePickerRow>
                          <Index each={week()}>
                            {(day) => (
                              <DatePickerDayCell value={day()}>
                                <DatePickerDayCellTrigger>{day().day}</DatePickerDayCellTrigger>
                              </DatePickerDayCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Show>
              <Show when={api().view === 'month'}>
                <DatePickerGrid>
                  <DatePickerRowGroup>
                    <Index each={api().getMonthsGrid({ columns: 4, format: 'short' })}>
                      {(months) => (
                        <DatePickerRow>
                          <Index each={months()}>
                            {(month) => (
                              <DatePickerMonthCell value={month().value}>
                                <DatePickerMonthCellTrigger>
                                  {month().label}
                                </DatePickerMonthCellTrigger>
                              </DatePickerMonthCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Show>
              <Show when={api().view === 'year'}>
                <DatePickerGrid>
                  <DatePickerRowGroup>
                    <Index each={api().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePickerRow>
                          <Index each={years()}>
                            {(year) => (
                              <DatePickerYearCell value={year().value}>
                                <DatePickerYearCellTrigger>
                                  {year().label}
                                </DatePickerYearCellTrigger>
                              </DatePickerYearCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Show>
            </DatePickerContent>
          </DatePickerPositioner>
        </Portal>
      </>
    )}
  </DatePicker>
)

export const RangeWithTwoGrids = () => (
  <DatePicker selectionMode="range" numOfMonths={2}>
    {(api) => (
      <>
        <DatePickerControl>
          <span>View mode: {api().view}</span>
          <DatePickerInput />
          <DatePickerTrigger>🗓</DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <Portal>
          <DatePickerPositioner>
            <DatePickerContent>
              <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <time>{api().visibleRangeText.start}</time>
                <time>{api().visibleRangeText.end}</time>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
              <div style={{ display: 'flex', 'justify-content': 'space-between', gap: '24px' }}>
                <DatePickerGrid>
                  <DatePickerRowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePickerColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePickerColumnHeader>
                      )}
                    </Index>
                  </DatePickerRowHeader>
                  <DatePickerRowGroup>
                    <Index each={api().weeks}>
                      {(week) => {
                        return (
                          <DatePickerRow>
                            <Index each={week()}>
                              {(day) => (
                                <DatePickerDayCell value={day()}>
                                  <DatePickerDayCellTrigger>{day().day}</DatePickerDayCellTrigger>
                                </DatePickerDayCell>
                              )}
                            </Index>
                          </DatePickerRow>
                        )
                      }}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>

                <DatePickerGrid>
                  <DatePickerRowHeader>
                    <Index each={api().weekDays}>
                      {(day) => (
                        <DatePickerColumnHeader aria-label={day().long}>
                          {day().narrow}
                        </DatePickerColumnHeader>
                      )}
                    </Index>
                  </DatePickerRowHeader>
                  <DatePickerRowGroup>
                    <Index each={api().getOffset(1).weeks}>
                      {(week) => (
                        <DatePickerRow>
                          <Index each={week()}>
                            {(day) => (
                              <DatePickerDayCell value={day()} offset={api().getOffset(1)}>
                                <DatePickerDayCellTrigger>{day().day}</DatePickerDayCellTrigger>
                              </DatePickerDayCell>
                            )}
                          </Index>
                        </DatePickerRow>
                      )}
                    </Index>
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </div>
            </DatePickerContent>
          </DatePickerPositioner>
        </Portal>
      </>
    )}
  </DatePicker>
)
