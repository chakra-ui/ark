import type { Meta } from 'storybook-solidjs'
import { Splitter } from '../'
import './splitter.css'

type SplitterType = typeof Splitter

const meta: Meta<SplitterType> = {
  title: 'Splitter',
  component: Splitter,
}

export default meta

export const Basic = () => (
  <Splitter.Root
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)

export const RenderProp = () => (
  <Splitter.Root
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    {(api) => (
      <>
        <Splitter.Panel id="a">
          <button onClick={() => api().setSize('a', 10)}>Set to 10%</button>
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">
          <button onClick={() => api().setSize('b', 10)}>Set to 10%</button>
        </Splitter.Panel>
      </>
    )}
  </Splitter.Root>
)

export const Events = () => (
  <Splitter.Root
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    onSizeChangeStart={(details) => console.log('onSizeChangeStart', details)}
    onSizeChangeEnd={(details) => console.log('onSizeChangeEnd', details)}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)

export const Vertical = () => (
  <Splitter.Root
    orientation="vertical"
    size={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
