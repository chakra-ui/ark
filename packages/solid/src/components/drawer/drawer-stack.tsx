import * as drawer from '@zag-js/drawer'
import { normalizeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createMemo } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { DrawerStackProvider } from './use-drawer-stack-context'
import { DrawerStackStoreProvider } from './use-drawer-stack-store'

export interface DrawerStackProps {
  children?: JSX.Element
}

export const DrawerStack = (props: DrawerStackProps) => {
  const stack = drawer.createStack()
  const [snapshot, setSnapshot] = createStore(stack.getSnapshot())
  stack.subscribe(() => setSnapshot(reconcile(stack.getSnapshot())))
  const stackApi = createMemo(() => drawer.connectStack(snapshot, normalizeProps))

  return (
    <DrawerStackStoreProvider value={stack}>
      <DrawerStackProvider value={stackApi}>{props.children}</DrawerStackProvider>
    </DrawerStackStoreProvider>
  )
}
