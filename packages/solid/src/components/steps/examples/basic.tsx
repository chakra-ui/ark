import { For } from 'solid-js'
import { Steps } from '..'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

export const Basic = () => {
  return (
    <Steps.Root count={items.length}>
      <Steps.List>
        <For each={items}>
          {(item, index) => (
            <Steps.Item index={index()}>
              <Steps.Trigger>
                <Steps.Indicator>{index() + 1}</Steps.Indicator>
                <span>{item.title}</span>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>

      <For each={items}>
        {(item, index) => (
          <Steps.Content index={index()}>
            {item.title} - {item.description}
          </Steps.Content>
        )}
      </For>

      <Steps.CompletedContent>
        Steps Complete - Thank you for filling out the form!
      </Steps.CompletedContent>

      <div>
        <Steps.PrevTrigger>Back</Steps.PrevTrigger>
        <Steps.NextTrigger>Next</Steps.NextTrigger>
      </div>
    </Steps.Root>
  )
}
