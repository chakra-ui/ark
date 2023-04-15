import { DatePicker } from './'

export const Basic = () => {
  return (
    <DatePicker selectionMode="single">
      {(api) => <h1>Datepicker {api.focusedValueAsString}</h1>}
    </DatePicker>
  )
}
