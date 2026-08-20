'use client'

import { type HotkeyStoreOptions, createHotkeyStore } from '@zag-js/hotkeys'
import { type PropsWithChildren, useRef, useState } from 'react'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect.ts'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'
import { HotkeyStoreContextProvider } from './use-hotkey-store.ts'

export interface HotkeysProviderProps extends PropsWithChildren, Omit<HotkeyStoreOptions, 'target'> {}

export const HotkeysProvider = (props: HotkeysProviderProps) => {
  const { children, activeScopes, conflictBehavior, defaultOptions, sequenceTimeoutMs } = props

  const env = useEnvironmentContext()

  const [store] = useState(() =>
    createHotkeyStore({ activeScopes, conflictBehavior, defaultOptions, sequenceTimeoutMs }),
  )

  const optionsRef = useRef({ activeScopes, defaultOptions })
  optionsRef.current = { activeScopes, defaultOptions }

  useSafeLayoutEffect(() => {
    store.init({ target: env.getRootNode() as Document, defaultOptions: optionsRef.current.defaultOptions })
    return () => {
      store.destroy()
    }
  }, [store, env])

  const scopeKey = activeScopes === undefined ? '' : String(activeScopes)

  useSafeLayoutEffect(() => {
    const scopes = optionsRef.current.activeScopes
    if (scopes === undefined) return
    store.setScope(scopes)
  }, [store, scopeKey])

  return <HotkeyStoreContextProvider value={store}>{children}</HotkeyStoreContextProvider>
}
