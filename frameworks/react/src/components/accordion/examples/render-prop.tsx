import { Accordion } from '../..'

export const RenderProp = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      {items.map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemContext>
            {(accordionItem) => (
              <>
                <Accordion.ItemTrigger>
                  {accordionItem.isOpen ? 'Close' : 'Open'}
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>{item} content</Accordion.ItemContent>
              </>
            )}
          </Accordion.ItemContext>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
