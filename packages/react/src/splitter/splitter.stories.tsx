import 'splitter.css'
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '.'

export const Basic = () => (
  <>
    <Splitter
      size={[
        { id: 'a', size: 50 },
        { id: 'b', size: 50 },
      ]}
    >
      <SplitterPanel id="a">
        <p>A</p>
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b">
        <div className="bar" />
      </SplitterResizeTrigger>
      <SplitterPanel id="b">
        <p>B</p>
      </SplitterPanel>
    </Splitter>
  </>
)
