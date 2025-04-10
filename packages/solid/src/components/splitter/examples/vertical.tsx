import { Splitter } from '@ark-ui/solid/splitter'

export const Vertical = () => (
  <Splitter.Root orientation="vertical" defaultSize={[50, 50]} panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
