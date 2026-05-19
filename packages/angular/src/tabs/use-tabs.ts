import * as tabs from '@zag-js/tabs'
import type { Machine } from '@zag-js/core'
import { effect, signal, type Signal } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseTabsProps extends OptionalId<Omit<tabs.Props, 'dir' | 'getRootNode'>> {
  /** Whether tab content should be lazy mounted. */
  lazyMount?: boolean
  /** Whether tab content should be unmounted when hidden. */
  unmountOnExit?: boolean
}

export interface UseTabsReturn extends UseMachineReturn<tabs.Service['state'], tabs.Api, tabs.Service> {
  /** Whether template-controlled tab content should be unmounted. */
  readonly isContentUnmounted: (value: string) => boolean
  /** Values that have been selected at least once. */
  readonly mountedValues: Signal<ReadonlySet<string>>
}

export interface UseTabsOptions {
  context: () => UseTabsProps
}

type TabsContext = Record<string, unknown>
type TabsSchema = tabs.Machine extends Machine<infer TSchema> ? TSchema : never

export function useTabs(options: UseTabsOptions): UseTabsReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('tabs')
  const mountedValues = signal<ReadonlySet<string>>(new Set())

  const machine = useMachine<TabsSchema, tabs.Api>({
    machine: tabs.machine,
    context: () => {
      const props = options.context()
      const { lazyMount: _lazyMount, unmountOnExit: _unmountOnExit, ...tabsProps } = props
      return {
        ...tabsProps,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: tabsProps.id ?? fallbackId,
      } as TabsContext
    },
    connect: (service, normalize) => tabs.connect(service, normalize),
  })

  effect(() => {
    const value = machine.api().value
    if (value == null) return

    mountedValues.update((current) => {
      if (current.has(value)) return current
      return new Set(current).add(value)
    })
  })

  const isContentUnmounted = (value: string): boolean => {
    const { lazyMount, unmountOnExit } = options.context()
    const selectedValue = machine.api().value
    if (selectedValue === value) return false

    const hasMounted = mountedValues().has(value)
    return Boolean((lazyMount && !hasMounted) || (unmountOnExit && hasMounted))
  }

  return {
    ...machine,
    isContentUnmounted,
    mountedValues,
  }
}
