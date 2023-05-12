import type { Meta } from '@storybook/react'
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerMonthSelect,
  DatePickerTrigger,
  DatePickerYearSelect,
} from './'
import './date-picker.css'

type DatePickerType = typeof DatePicker

const meta: Meta<DatePickerType> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default meta

export const Basic = () => {
  return (
    <DatePicker selectionMode="range">
      {(api) => (
        <>
          <output>
            <div>Selected: {api.valueAsString ?? '-'}</div>
            <div>Focused: {api.focusedValueAsString}</div>
          </output>
          <DatePickerControl>
            <DatePickerInput />
            <DatePickerTrigger>🗓</DatePickerTrigger>
            <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
          </DatePickerControl>
          <DatePickerContent>
            <>
              <DatePickerYearSelect />
              <DatePickerMonthSelect />

              {/* {api.daysOfMonth.map((day) => (
                  <DatePickerDayTrigger key={day.day} value={day} />
                ))} */}
              {/* <DatePickerGrid>
 

                {api.weeks.map((week) =>
                  week.map((day, id) => {
                    if (day === null) return <div />
                    return (
                      <div key={id} {...api.getDayCellProps({ value: day })}>
                        <button {...api.getDayCellTriggerProps({ value: day })}>{day.day}</button>
                      </div>
                    )
                  }),
                )}
              </DatePickerGrid> */}
              <div role="grid">
                <div role="row">
                  <div role="columnheader">Mo</div>
                </div>
                <div role="rowgroup">
                  <div role="row">
                    <div role="gridcell">
                      <button role="button">1</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 
              <DatePickerGrid>
                <DatePickerHeaderRow> 
                  <DatePickerHeader />
                </DatePickerHeaderRow>
                <DatePickerRowGroup>
                  <DatePickerRow>
                    <DatePickerDayCell>
                      <DatePickerDayCellTrigger />
                    </DatePickerDayCell>
                  </DatePickerRow>
                </DatePickerRowGroup>
              </DatePickerGrid> 
*/}

              {/* <table {...api.getGridProps()}>
                <thead {...api.getHeaderProps()}>
                  <tr>
                    {api.weekDays.map((day, i) => (
                      <th scope="col" key={i} aria-label={day.long}>
                        {day.narrow}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {api.weeks.map((week, i) => (
                    <tr key={i}>
                      {week.map((value, i) => {
                        if (value === null) return <td key={i} />
                        return (
                          <td key={i} {...api.getDayCellProps({ value })}>
                            <div {...api.getDayCellTriggerProps({ value })}>{value.day}</div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </>
          </DatePickerContent>
        </>
      )}
    </DatePicker>
  )
}
