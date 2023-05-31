import type { Meta } from 'storybook-solidjs'
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '.'
import './splitter.css'

const meta: Meta = {
  title: 'Splitter',
}

export default meta

export const Basic = () => (
  <Splitter
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)

export const RenderProp = () => (
  <Splitter
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    {(api) => (
      <>
        <SplitterPanel id="a">
          <button onClick={() => api().setSize('a', 10)}>Set to 10%</button>
        </SplitterPanel>
        <SplitterResizeTrigger id="a:b" />
        <SplitterPanel id="b">
          <button onClick={() => api().setSize('b', 10)}>Set to 10%</button>
        </SplitterPanel>
      </>
    )}
  </Splitter>
)

export const Events = () => (
  <Splitter
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    onResizeStart={(details) => console.log('onResizeStart', details)}
    onResizeEnd={(details) => console.log('onResizeEnd', details)}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)

export const Vertical = () => (
  <Splitter
    orientation="vertical"
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)
