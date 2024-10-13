import { Splitter, useSplitter } from '@ark-ui/react/splitter'

export const RootProvider = () => {
  const splitter = useSplitter({ defaultSize: [{ id: 'a', size: 50 }] })

  return (
    <>
      <button onClick={() => splitter.setToMaxSize('a')}>Maximize a</button>

      <Splitter.RootProvider value={splitter}>
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.RootProvider>
    </>
  )
}
