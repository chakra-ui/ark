import type { Meta } from '@storybook/react'
import { Splitter, SplitterPanel, SplitterResizeTrigger } from './'
import './splitter.css'

type SplitterType = typeof Splitter

const meta: Meta<SplitterType> = {
  title: 'Splitter',
  component: Splitter,
}

export default meta

export const Basic = () => (
  <Splitter
    defaultSize={[
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
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    {(api) => (
      <>
        <SplitterPanel id="a">
          <button onClick={() => api.setSize('a', 10)}>Set to 10%</button>
        </SplitterPanel>
        <SplitterResizeTrigger id="a:b" />
        <SplitterPanel id="b">
          <button onClick={() => api.setSize('b', 10)}>Set to 10%</button>
        </SplitterPanel>
      </>
    )}
  </Splitter>
)

export const Events = () => (
  <Splitter
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    onSizeChangeStart={(details) => console.log('onSizeChangeStart', details)}
    onSizeChangeEnd={(details) => console.log('onSizeChangeEnd', details)}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)

export const Vertical = () => (
  <Splitter
    orientation="vertical"
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <SplitterPanel id="a">A</SplitterPanel>
    <SplitterResizeTrigger id="a:b" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
)
