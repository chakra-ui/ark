import { Splitter } from '@ark-ui/react/splitter'

export const RenderProp = () => (
  <Splitter.Root
    defaultSize={[
      { id: 'a', size: 50 },
      { id: 'b', size: 50 },
    ]}
  >
    <Splitter.Context>
      {(splitter) => (
        <>
          <Splitter.Panel id="a">
            <button type="button" onClick={() => splitter.setSize('a', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" />
          <Splitter.Panel id="b">
            <button type="button" onClick={() => splitter.setSize('b', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
        </>
      )}
    </Splitter.Context>
  </Splitter.Root>
)
