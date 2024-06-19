import { Splitter, type SplitterRootProps } from '../'

export const ComponentUnderTest = (props: SplitterRootProps) => (
  <Splitter.Root
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    {...props}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Reisze">
      <div className="bar" />
    </Splitter.ResizeTrigger>
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
