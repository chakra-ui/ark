import { splitterAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getExports, getParts } from '../setup-test'
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
  it.each(getParts(splitterAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(splitterAnatomy))('should export %s', async (part) => {
    expect(Splitter[part]).toBeDefined()
  })
})
