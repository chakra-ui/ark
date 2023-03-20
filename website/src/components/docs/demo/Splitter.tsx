import { splitter } from '@/panda/recipes'
import { Splitter, SplitterPanel, SplitterResizeTrigger, type SplitterProps } from '@ark-ui/react'
import { useId } from 'react'

const Basic = (props: Partial<SplitterProps> & { content?: React.ReactNode }) => {
  const [first, second] = [useId(), useId()].map((id) => id.replace(/:/g, '-'))
  return (
    <>
      <Splitter
        size={[
          { id: first, size: 50 },
          { id: second, size: 50 },
        ]}
        {...props}
        className={splitter()}
      >
        <SplitterPanel id={first}>{props.content ?? <p>{first}</p>}</SplitterPanel>
        <SplitterResizeTrigger id={`${first}:${second}`}>
          <div />
        </SplitterResizeTrigger>
        <SplitterPanel id={second}>{props.children ?? <p>{second}</p>}</SplitterPanel>
      </Splitter>
    </>
  )
}

export const DemoSplitter = (props: Partial<SplitterProps>) => (
  <div style={{ height: '26rem', width: '100%' }}>
    <Basic {...props} orientation="vertical" content="A">
      <Basic {...props} content="B">
        <Basic {...props} orientation="vertical" content="C">
          D
        </Basic>
      </Basic>
    </Basic>
  </div>
)
