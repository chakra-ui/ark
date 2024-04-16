import { Index } from 'solid-js'
import { Accordion } from '../..'

export const RenderProp = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()}>
            <Accordion.ItemContext>
              {(api) => (
                <>
                  <Accordion.ItemTrigger>{api().isOpen ? 'Close' : 'Open'}</Accordion.ItemTrigger>
                  <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
                </>
              )}
            </Accordion.ItemContext>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}
