import { useId } from 'react'
import { Splitter, SplitterPanel, SplitterProps, SplitterResizeTrigger } from '.'
import './splitter.css'

const Basic = (props: Partial<SplitterProps>) => {
  const [first, second] = [useId(), useId()].map((id) => id.replaceAll(':', '-'))
  return (
    <>
      <Splitter
        size={[
          { id: first, size: 50 },
          { id: second, size: 50 },
        ]}
        {...props}
      >
        <SplitterPanel id={first}>
          <p>{first}</p>
        </SplitterPanel>
        <SplitterResizeTrigger id={`${first}:${second}`}>
          <div className="bar" />
        </SplitterResizeTrigger>
        <SplitterPanel id={second}>{props.children ?? <p>{second}</p>}</SplitterPanel>
      </Splitter>
    </>
  )
}

export const Nested = () => (
  <div style={{ height: '100vh' }}>
    <Basic orientation="vertical">
      <Basic>
        <Basic orientation="vertical" />
      </Basic>
    </Basic>
  </div>
)
