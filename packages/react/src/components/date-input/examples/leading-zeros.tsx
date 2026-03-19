import { DateInput } from '@ark-ui/react/date-input'

export const LeadingZeros = () => (
  <DateInput.Root shouldForceLeadingZeros>
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.Input />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)
