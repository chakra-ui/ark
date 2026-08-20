import { type CommandDefinition, type Platform, normalizeHotkey } from '@zag-js/hotkeys'
import { isEqual } from '@zag-js/utils'
import { type MaybeRef, onUnmounted, toValue, watchEffect } from 'vue'
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

export const useHotkeys = (commands: MaybeRef<UseHotkeysCommand[]>) => {
  const store = useHotkeyStore()
  const platform = usePlatform()

  const registered = new Map<string, Registration>()
  const latest = () => toValue(commands)

  watchEffect(() => {
    const current = toValue(commands)
    const resolvedPlatform = platform.value

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

  onUnmounted(() => {
    for (const id of registered.keys()) store.unregister(id)
    registered.clear()
  })
}
