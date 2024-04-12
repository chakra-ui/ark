import type { Meta } from '@storybook/vue3'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Accordion } from '..'

const meta: Meta = {
  title: 'Components / Accordion',
}

export default meta

export const Basic = () => {
  return (
    <Accordion.Root>
      {['React', 'Solid', 'Vue'].map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemTrigger>
            What is {item}?
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            {item} is a JavaScript library for building user interfaces.
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
