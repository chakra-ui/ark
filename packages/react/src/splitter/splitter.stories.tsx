import type { Meta } from '@storybook/react'
import { useId, useState } from 'react'
import { Splitter, SplitterPanel, SplitterResizeTrigger, type SplitterProps } from '.'
import './splitter.css'

type SplitterType = typeof Splitter

const meta: Meta<SplitterType> = {
  title: 'Splitter',
  component: Splitter,
}

export default meta

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

export const Controlled = () => {
  const [size, setSize] = useState([
    { id: 'first', size: 50 },
    { id: 'second', size: 50 },
  ])

  return (
    <div style={{ height: '100vh' }}>
      <Splitter
        size={size}
        onResizeEnd={(details) => {
          setSize(
            details.size.map((s) => ({
              id: `${s.id}`,
              size: s.size!,
            })),
          )
        }}
      >
        <SplitterPanel id={'first'}>
          <p>first</p>
        </SplitterPanel>
        <SplitterResizeTrigger id={`first:second`}>
          <div className="bar" />
        </SplitterResizeTrigger>
        <SplitterPanel id="second">
          <p>second</p>
        </SplitterPanel>
      </Splitter>
    </div>
  )
}
