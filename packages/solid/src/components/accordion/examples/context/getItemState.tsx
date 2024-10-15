import { Accordion } from '@ark-ui/solid/accordion'
import { ChevronDownIcon } from 'lucide-solid'
import { Index } from 'solid-js'

export const ContextGetItemState = () => {
  const items = [{ value: 'React' }, { value: 'Solid', disabled: true }, { value: 'Vue' }]
  return (
    <Accordion.Root defaultValue={['React']}>
      <Accordion.Context>
        {(context) => {
          const itemState = context().getItemState(items[2])
          return (
            <>
              <b>Vue State: </b>
              <span>Disabled: {itemState.disabled ? 'Y' : 'N'} </span>
              <span>Expanded: {itemState.expanded ? 'Y' : 'N'} </span>
              <span>Focused: {itemState.focused ? 'Y' : 'N'} </span>
            </>
          )
        }}
      </Accordion.Context>
      <Index each={items}>
        {(item) => (
          <Accordion.Item {...item()}>
            <Accordion.ItemTrigger>
              What is {item().value}?
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              {item().value} is a JavaScript library for building user interfaces.
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}
