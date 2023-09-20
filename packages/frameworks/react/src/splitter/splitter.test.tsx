import { splitterAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/react'
import { Splitter, SplitterPanel, SplitterResizeTrigger, type SplitterProps } from '.'
import { getExports, getParts } from '../setup-test'

const ComponentUnderTest = (props: SplitterProps) => (
  <Splitter
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    {...props}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)

describe('Splitter', () => {
  it.each(getParts(splitterAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(splitterAnatomy))('should export %s', async (part) => {
    expect(Splitter[part]).toBeDefined()
  })
})
