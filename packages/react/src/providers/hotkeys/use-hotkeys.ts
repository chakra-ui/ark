'use client'

import { type CommandDefinition, type HotkeyStore, type ParsedHotkey, parseHotkey } from '@zag-js/hotkeys'
import { isEqual, warn } from '@zag-js/utils'
import { useEffect, useId, useRef } from 'react'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.ts'
import { type Platform, usePlatform } from './use-platform.ts'

export interface UseHotkeysCommand extends Omit<CommandDefinition, 'id'> {
  /**
   * Identifies the command across renders. One is generated when omitted, which is enough
   * unless something else needs to address this command by name.
   */
  id?: string | undefined
}

export interface UseHotkeysProps extends UseHotkeyStoreProps {
  /**
   * The commands to register.
   */
  commands: UseHotkeysCommand[]
  /**
   * Prefix for the ids generated for commands that do not set their own. One is generated
   * when omitted.
   */
  id?: string | undefined
}

interface Registration {
  hotkey: ParsedHotkey
  scopes: CommandDefinition['scopes']
  label: string | undefined
  description: string | undefined
  category: string | undefined
  keywords: string[] | undefined
  options: CommandDefinition['options']
}

// A command id already on the store that this hook did not put there belongs to another
// component. Registering over it silently stops the first one from firing.
const warnOnForeignId = (store: HotkeyStore, id: string) => {
  warn(
    store.getState().commands.has(id),
    `[ark-ui/hotkeys] Command id "${id}" is already registered on this store by another component, so the earlier command will stop firing. Use a unique id, omit it to have one generated, or register on a separate store.`,
  )
}

const toRegistration = (command: UseHotkeysCommand, platform: Platform): Registration => ({
  hotkey: parseHotkey(command.hotkey, platform),
  scopes: command.scopes,
  label: command.label,
  description: command.description,
  category: command.category,
  keywords: command.keywords,
  options: command.options,
})

export const useHotkeys = (props: UseHotkeysProps) => {
  const store = useHotkeyStore(props)
  const platform = usePlatform()
  const generatedId = useId()
  const instanceId = props.id ?? generatedId

  const commandsRef = useRef(props.commands)
  commandsRef.current = props.commands

  const registered = useRef(new Map<string, Registration>())

  // A command without an id is keyed by its position in this hook instance, so two
  // components registering the same shortcut never collide.
  const resolveId = (command: UseHotkeysCommand, index: number) => command.id ?? `${instanceId}:${index}`

  // Resolved on every event so the action and enabled state are never a render behind.
  const findCommand = (id: string) => commandsRef.current.find((item, index) => resolveId(item, index) === id)

  useEffect(() => {
    const current = commandsRef.current
    const nextIds = new Set(current.map(resolveId))

    for (const id of [...registered.current.keys()]) {
      if (nextIds.has(id)) continue
      store.unregister(id)
      registered.current.delete(id)
    }

    current.forEach((command, index) => {
      const id = resolveId(command, index)
      const next = toRegistration(command, platform)
      const previous = registered.current.get(id)

      if (previous && isEqual(previous, next)) return
      if (previous) store.unregister(id)
      else warnOnForeignId(store, id)

      store.register({
        ...command,
        id,
        action: (event) => {
          findCommand(id)?.action(event)
        },
        enabled: () => {
          const enabled = findCommand(id)?.enabled
          if (enabled === undefined) return true
          return typeof enabled === 'function' ? enabled() : enabled
        },
      })

      registered.current.set(id, next)
    })
  })

  useEffect(() => {
    const registry = registered.current
    return () => {
      for (const id of registry.keys()) store.unregister(id)
      registry.clear()
    }
  }, [store])
}
