import { Splitter } from '@ark-ui/react/splitter'

export const Events = () => (
  <Splitter.Root
    panels={[{ id: 'a' }, { id: 'b' }]}
    onResize={(details) => console.log('onResize', details)}
    onResizeStart={() => console.log('onResizeStart')}
    onResizeEnd={(details) => console.log('onResizeEnd', details)}
    onExpand={(details) => console.log('onExpand', details)}
    onCollapse={(details) => console.log('onCollapse', details)}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
