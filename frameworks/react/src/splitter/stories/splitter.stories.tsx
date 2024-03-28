import type { Meta } from '@storybook/react'
import { Splitter } from '../'
import './splitter.css'

const meta: Meta = {
  title: 'Components / Splitter',
}

export default meta

export const Basic = () => (
  <Splitter.Root
    defaultSize={[
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
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <Splitter.Context>
      {(context) => (
        <>
          <Splitter.Panel id="a">
            <button onClick={() => context.setSize('a', 10)}>Set to 10%</button>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" />
          <Splitter.Panel id="b">
            <button onClick={() => context.setSize('b', 10)}>Set to 10%</button>
          </Splitter.Panel>
        </>
      )}
    </Splitter.Context>
  </Splitter.Root>
)

export const Events = () => (
  <Splitter.Root
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
    onSizeChange={(details) => console.log('onSizeChange', details)}
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
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
