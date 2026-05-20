export interface StepExampleItem {
  readonly value: string
  readonly title: string
  readonly description: string
}

export const stepExampleItems: StepExampleItem[] = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]
