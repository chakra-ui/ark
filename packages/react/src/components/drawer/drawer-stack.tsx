import * as drawer from '@zag-js/drawer'
import { normalizeProps } from '@zag-js/react'
import { type ReactNode, useMemo, useState, useSyncExternalStore } from 'react'
import { DrawerStackProvider } from './use-drawer-stack-context'
import { DrawerStackStoreProvider } from './use-drawer-stack-store'

export interface DrawerStackProps {
  children?: ReactNode | undefined
}

export const DrawerStack = (props: DrawerStackProps) => {
  const { children } = props
  const [stack] = useState(() => drawer.createStack())
  const snapshot = useSyncExternalStore(stack.subscribe, stack.getSnapshot, stack.getSnapshot)
  const stackApi = useMemo(() => drawer.connectStack(snapshot, normalizeProps), [snapshot])

  return (
    <DrawerStackStoreProvider value={stack}>
      <DrawerStackProvider value={stackApi}>{children}</DrawerStackProvider>
    </DrawerStackStoreProvider>
  )
}
