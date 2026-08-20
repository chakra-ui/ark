'use client'

import type { CommandDefinition } from '@zag-js/hotkeys'
import { isEqual } from '@zag-js/utils'
import { useEffect, useRef } from 'react'
import { normalizeHotkey } from './normalize-hotkey.ts'
import { useHotkeyStore } from './use-hotkey-store.ts'
import { usePlatform } from './use-platform.ts'

export interface UseHotkeysCommand extends CommandDefinition {}

interface Registration {
  hotkey: string
  scopes: CommandDefinition['scopes']
  label: string | undefined
  description: string | undefined
  category: string | undefined
  keywords: string[] | undefined
  options: CommandDefinition['options']
  // TODO(zag-bump): drop `enabled` once @zag-js/hotkeys > 1.43.1 is released. 1.43.1 gates
  // listener attachment on `enabled`, so a command registered while disabled never attaches
  // listeners and `enable()` cannot recover. Re-registering that command works around it.
  enabled: boolean | 'fn' | undefined
}

const toRegistration = (command: UseHotkeysCommand, platform: Platform): Registration => ({
  hotkey: normalizeHotkey(command.hotkey, platform),
  scopes: command.scopes,
  label: command.label,
  description: command.description,
  category: command.category,
  keywords: command.keywords,
  options: command.options,
  enabled: typeof command.enabled === 'function' ? 'fn' : command.enabled,
})

type Platform = ReturnType<typeof usePlatform>

export const useHotkeys = (commands: UseHotkeysCommand[]) => {
  const store = useHotkeyStore()
  const platform = usePlatform()

  const commandsRef = useRef(commands)
  commandsRef.current = commands

  const registered = useRef(new Map<string, Registration>())

  useEffect(() => {
    const current = commandsRef.current
    const nextIds = new Set(current.map((command) => command.id))

    for (const id of [...registered.current.keys()]) {
      if (nextIds.has(id)) continue
      store.unregister(id)
      registered.current.delete(id)
    }

    for (const command of current) {
      const next = toRegistration(command, platform)
      const previous = registered.current.get(command.id)

      if (previous && isEqual(previous, next)) continue
      if (previous) store.unregister(command.id)

      store.register({
        ...command,
        action: (event) => {
          commandsRef.current.find((item) => item.id === command.id)?.action(event)
        },
        enabled: () => {
          const enabled = commandsRef.current.find((item) => item.id === command.id)?.enabled
          if (enabled === undefined) return true
          return typeof enabled === 'function' ? enabled() : enabled
        },
      })

      registered.current.set(command.id, next)
    }
  })

  useEffect(() => {
    const registry = registered.current
    return () => {
      for (const id of registry.keys()) store.unregister(id)
      registry.clear()
    }
  }, [store])
}
