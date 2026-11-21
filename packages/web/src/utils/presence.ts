import * as presence from '@zag-js/presence'
import { mergeProps, normalizeProps, VanillaMachine } from '@zag-js/vanilla'

import { definePart, defineRoot, rootOf, targetOf, type PartConfig, type RootConfig } from './define.js'
import { emit } from './events.js'
import { mountTemplate } from './lazy.js'

interface Entry {
  service: VanillaMachine<any>
  present: () => boolean
  sync: VoidFunction
}

const machines = new WeakMap<HTMLElement, Entry>()

function startPresence(
  host: HTMLElement,
  present: () => boolean,
  onChange: VoidFunction,
  onExitComplete?: VoidFunction,
) {
  const service = new VanillaMachine(presence.machine, () => ({ present: present(), onExitComplete }))
  let last = present()
  const sync = () => {
    if (present() === last) return
    last = present()
    service.updateProps({})
  }
  machines.set(host, { service, present, sync })
  const unsubscribe = service.subscribe(onChange)
  service.start()
  return () => {
    unsubscribe()
    service.stop()
    machines.delete(host)
  }
}

const apiOf = (entry: Entry) => presence.connect(entry.service.service, normalizeProps)

const within = (host: HTMLElement, root: HTMLElement | null, selector: string) =>
  !!(host.closest(selector) ?? root?.closest(selector))

function presenceProps(host: HTMLElement, root: HTMLElement | null) {
  const entry = machines.get(host)
  if (!entry) return {}
  const api = apiOf(entry)
  const skip = api.skip && within(host, root, '[skip-animation-on-mount]')
  return {
    'data-state': skip ? undefined : entry.present() ? 'open' : 'closed',
    hidden: !api.present,
  }
}

function mountContent(part: HTMLElement, host: HTMLElement, root: HTMLElement | null) {
  const entry = machines.get(host)
  if (entry) mountTemplate(part, apiOf(entry).present, within(host, root, '[unmount-on-exit]'))
}

export function definePresenceRoot<Api>(config: RootConfig<Api> & { present: (api: Api) => boolean }) {
  const { present, ...rest } = config
  return defineRoot<Api>({
    ...rest,
    attributes: [...(rest.attributes ?? []), 'skip-animation-on-mount'],
    setup(el) {
      const stop = startPresence(
        el,
        () => (el.api ? present(el.api) : false),
        () => el.render(),
        () => emit(el, 'exitcomplete'),
      )
      const cleanup = rest.setup?.(el)
      return () => {
        stop()
        cleanup?.()
      }
    },
    render(api, el) {
      machines.get(el)?.sync()
      rest.render?.(api, el)
    },
  })
}

interface PresencePartConfig<Api> extends PartConfig<Api> {
  present?: (api: Api) => boolean
  animates?: boolean
}

export function definePresencePart<Api>(config: PresencePartConfig<Api>) {
  const { present, animates = true, ...rest } = config
  const rootEl = (el: HTMLElement) => rootOf(el, config.root)
  const hostOf = (el: HTMLElement) => (present ? el : rootEl(el)!)

  return definePart<Api>({
    ...rest,
    setup(el, root) {
      const stop = present
        ? startPresence(
            el,
            () => (root.api ? present(root.api) : false),
            () => root.api && el.update(root.api),
          )
        : undefined
      const entry = machines.get(hostOf(el))
      if (animates && entry) apiOf(entry).setNode(targetOf(el, rest.target))
      const cleanup = rest.setup?.(el, root)
      return () => {
        stop?.()
        cleanup?.()
      }
    },
    props: (api, el) => mergeProps(rest.props(api, el), presenceProps(hostOf(el), rootEl(el))),
    render(api, el) {
      if (present) machines.get(el)?.sync()
      if (animates) mountContent(el, hostOf(el), rootEl(el))
      rest.render?.(api, el)
    },
  })
}
