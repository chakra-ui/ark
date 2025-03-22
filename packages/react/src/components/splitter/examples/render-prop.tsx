import { Splitter } from '@ark-ui/react/splitter'

export const RenderProp = () => (
  <Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Context>
      {(splitter) => (
        <>
          <Splitter.Panel id="a">
            <button type="button" onClick={() => splitter.resizePanel('a', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
          <Splitter.Panel id="b">
            <button type="button" onClick={() => splitter.resizePanel('b', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
        </>
      )}
    </Splitter.Context>
  </Splitter.Root>
)
