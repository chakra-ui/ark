import { type CommandDefinition, type HotkeyStore, type ParsedHotkey, parseHotkey } from '@zag-js/hotkeys'
import { onDestroy } from 'svelte'
import { type MaybeFunction, isEqual, runIfFn, warn } from '@zag-js/utils'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.svelte.ts'
import { type Platform, usePlatform } from './use-platform.svelte.ts'

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
   * Prefix for the ids generated for commands that do not set their own. Pass `$props.id()`
   * from the calling component for a stable one; otherwise a random prefix is used.
   */
  id?: string | undefined
}

// `$props.id()` is the stable option, but it can only be called from a component, so the
// caller passes it in as `id`. Falling back to a random prefix is safe here: a hotkey id is
// only ever a key in the store's command map, never rendered, and registration happens in
// `$effect`, which does not run on the server.
const createInstanceId = () => `hotkeys:${Math.random().toString(36).slice(2, 10)}`

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

export function useHotkeys(props: MaybeFunction<UseHotkeysProps>) {
  const store = useHotkeyStore({ store: runIfFn(props).store })
  const platform = usePlatform()
  const instanceId = runIfFn(props).id ?? createInstanceId()

  const registered = new Map<string, Registration>()
  const latest = () => runIfFn(props).commands

  // A command without an id is keyed by its position in this hook instance, so two
  // components registering the same shortcut never collide.
  const resolveId = (command: UseHotkeysCommand, index: number) => command.id ?? `${instanceId}:${index}`

  // Resolved on every event so the action and enabled state are never a render behind.
  const findCommand = (id: string) => latest().find((item, index) => resolveId(item, index) === id)

  $effect(() => {
    const current = runIfFn(props).commands
    const resolvedPlatform = platform()

    const nextIds = new Set(current.map(resolveId))

    for (const id of [...registered.keys()]) {
      if (nextIds.has(id)) continue
      store.unregister(id)
      registered.delete(id)
    }

    current.forEach((command, index) => {
      const id = resolveId(command, index)
      const next = toRegistration(command, resolvedPlatform)
      const previous = registered.get(id)

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

      registered.set(id, next)
    })
  })

  onDestroy(() => {
    for (const id of registered.keys()) store.unregister(id)
    registered.clear()
  })
}
