import { Splitter } from '@ark-ui/solid/splitter'

export const RenderProp = () => (
  <Splitter.Root defaultSize={[50, 50]} panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Context>
      {(api) => (
        <>
          <Splitter.Panel id="a">
            <button type="button" onClick={() => api().resizePanel('a', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
          <Splitter.Panel id="b">
            <button type="button" onClick={() => api().resizePanel('b', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
        </>
      )}
    </Splitter.Context>
  </Splitter.Root>
)
