import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
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
            <DatePickerTrigger>
              <button>🗓</button>
            </DatePickerTrigger>
            <DatePickerClearTrigger>
              <button>❌</button>
            </DatePickerClearTrigger>
          </DatePickerControl>
          <DatePickerContent>
            <div>Content</div>
          </DatePickerContent>
        </>
      )}
    </DatePicker>
  )
}
