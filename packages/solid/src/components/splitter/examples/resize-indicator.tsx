import { Splitter } from '@ark-ui/solid/splitter'

export const ResizeIndicator = () => (
  <Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator />
    </Splitter.ResizeTrigger>
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
