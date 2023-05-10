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

export const Basic = () => {
  return (
    <DatePicker selectionMode="single">
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
            <div>
              <DatePickerYearSelect />
              <DatePickerMonthSelect />
              <table {...api.getGridProps()}>
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
              </table>
            </div>
            {/* <DatePickerDayView>
              <DatePickerDayCell>
                <DatePickerDayCellTrigger />
              </DatePickerDayCell>
            </DatePickerDayView> */}
            {/* <DatePickerGrid>
              <DatePickerDayView />
              <DatePickerMonthView />
              <DatePickerYearView />
            </DatePickerGrid> */}
          </DatePickerContent>
        </>
      )}
    </DatePicker>
  )
}
