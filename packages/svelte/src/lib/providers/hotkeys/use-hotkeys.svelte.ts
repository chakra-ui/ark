import { type CommandDefinition, type Platform, normalizeHotkey } from '@zag-js/hotkeys'
import { onDestroy } from 'svelte'
import { type MaybeFunction, isEqual, runIfFn } from '@zag-js/utils'
import { useHotkeyStore } from './use-hotkey-store.svelte.ts'
import { usePlatform } from './use-platform.svelte.ts'

export interface UseHotkeysCommand extends CommandDefinition {}

interface Registration {
  hotkey: string
  scopes: CommandDefinition['scopes']
  label: string | undefined
  description: string | undefined
  category: string | undefined
  keywords: string[] | undefined
  options: CommandDefinition['options']
}

const toRegistration = (command: UseHotkeysCommand, platform: Platform): Registration => ({
  hotkey: normalizeHotkey(command.hotkey, platform),
  scopes: command.scopes,
  label: command.label,
  description: command.description,
  category: command.category,
  keywords: command.keywords,
  options: command.options,
})

export function useHotkeys(commands: MaybeFunction<UseHotkeysCommand[]>) {
  const store = useHotkeyStore()
  const platform = usePlatform()

  const registered = new Map<string, Registration>()
  const latest = () => runIfFn(commands)

  $effect(() => {
    const current = runIfFn(commands)
    const resolvedPlatform = platform()

    const nextIds = new Set(current.map((command) => command.id))

    for (const id of [...registered.keys()]) {
      if (nextIds.has(id)) continue
      store.unregister(id)
      registered.delete(id)
    }

    for (const command of current) {
      const next = toRegistration(command, resolvedPlatform)
      const previous = registered.get(command.id)

      if (previous && isEqual(previous, next)) continue
      if (previous) store.unregister(command.id)

      store.register({
        ...command,
        action: (event) => {
          latest()
            .find((item) => item.id === command.id)
            ?.action(event)
        },
        enabled: () => {
          const enabled = latest().find((item) => item.id === command.id)?.enabled
          if (enabled === undefined) return true
          return typeof enabled === 'function' ? enabled() : enabled
        },
      })

      registered.set(command.id, next)
    }
  })

  onDestroy(() => {
    for (const id of registered.keys()) store.unregister(id)
    registered.clear()
  })
}
