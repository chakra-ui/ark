import { render } from '@testing-library/vue'
import { Splitter, SplitterPanel, SplitterResizeTrigger, type SplitterProps } from '.'

const ComponentUnderTest = (props: SplitterProps) => (
  <Splitter
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    {...props}
  >
    <SplitterPanel id="a">
      <p>A</p>
    </SplitterPanel>
    <SplitterResizeTrigger id="a:b">
      <div />
    </SplitterResizeTrigger>
    <SplitterPanel id="b">
      <p>B</p>
    </SplitterPanel>
  </Splitter>
)

describe('Splitter', () => {
  it('should render', async () => {
    render(ComponentUnderTest)
  })
})
