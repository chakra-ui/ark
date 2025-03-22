import { Splitter } from '../'
import type { Optional } from '../../../types'

export const ComponentUnderTest = (props: Optional<Splitter.RootProps, 'panels'>) => (
  <Splitter.Root defaultSize={[50, 50]} panels={[{ id: 'a' }, { id: 'b' }]} {...props}>
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Reisze" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
