import { Splitter } from '../'

export const ComponentUnderTest = () => (
  <Splitter.Root defaultSize={[50, 50]} panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b">
      <div class="bar" />
    </Splitter.ResizeTrigger>
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
