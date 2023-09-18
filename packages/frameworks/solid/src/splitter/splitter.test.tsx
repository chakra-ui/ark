import { render } from '@solidjs/testing-library'
import { Splitter, SplitterPanel, SplitterResizeTrigger, type SplitterProps } from '.'
const ComponentUnderTest = (props: SplitterProps) => (
  <Splitter
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    {...props}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b">
      <div class="bar" />
    </SplitterResizeTrigger>
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)

describe('Splitter', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })
})
