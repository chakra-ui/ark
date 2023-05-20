import { createSignal, createUniqueId } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Splitter, SplitterPanel, SplitterResizeTrigger, type SplitterProps } from '.'
import './splitter.css'

const meta: Meta = {
  title: 'Splitter',
}

export default meta

export const Basic = (props: Partial<SplitterProps>) => {
  const [first, second] = [createUniqueId(), createUniqueId()]
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
          <div class="bar" />
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
  const [size, setSize] = createSignal([
    { id: 'first', size: 50 },
    { id: 'second', size: 50 },
  ])

  return (
    <div style={{ height: '100vh' }}>
      <Splitter
        size={size()}
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
          <div class="bar" />
        </SplitterResizeTrigger>
        <SplitterPanel id="second">
          <p>second</p>
        </SplitterPanel>
      </Splitter>
    </div>
  )
}
