import { Splitter, useSplitter } from '@ark-ui/solid/splitter'

export const RootProvider = () => {
  const splitter = useSplitter({ defaultSize: [50, 50], panels: [{ id: 'a' }, { id: 'b' }] })

  return (
    <>
      <button onClick={() => splitter().setSizes([100, 0])}>Maximize a</button>

      <Splitter.RootProvider value={splitter}>
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.RootProvider>
    </>
  )
}
