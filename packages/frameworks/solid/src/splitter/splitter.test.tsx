import { render } from '@solidjs/testing-library'
import { Splitter, type SplitterProps } from './'

const ComponentUnderTest = (props: SplitterProps) => (
  <Splitter.Root
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    {...props}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b">
      <div class="bar" />
    </Splitter.ResizeTrigger>
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)

describe('Splitter', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })
})
