import * as collapsible from '@zag-js/collapsible'
import type { Machine } from '@zag-js/core'
import { computed, effect, signal, type Signal } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseCollapsibleProps extends OptionalId<Omit<collapsible.Props, 'dir' | 'getRootNode'>> {
  /** Whether the content should be lazy mounted. */
  lazyMount?: boolean
  /** Whether the content should be unmounted when collapsed. */
  unmountOnExit?: boolean
}

export interface UseCollapsibleReturn extends UseMachineReturn<
  collapsible.Service['state'],
  collapsible.Api,
  collapsible.Service
> {
  /** Whether template-controlled content should be unmounted. */
  readonly isUnmounted: Signal<boolean>
}

export interface UseCollapsibleOptions {
  context: () => UseCollapsibleProps
}

type CollapsibleContext = Record<string, unknown>
type CollapsibleSchema = collapsible.Machine extends Machine<infer TSchema> ? TSchema : never

export function useCollapsible(options: UseCollapsibleOptions): UseCollapsibleReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('collapsible')
  const wasVisible = signal(false)

  const machine = useMachine<CollapsibleSchema, collapsible.Api>({
    machine: collapsible.machine,
    context: () => {
      const props = options.context()
      const { lazyMount: _lazyMount, unmountOnExit: _unmountOnExit, ...collapsibleProps } = props
      return {
        ...collapsibleProps,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: collapsibleProps.id ?? fallbackId,
      } as CollapsibleContext
    },
    connect: (service, normalize) => collapsible.connect(service, normalize),
  })

  effect(() => {
    if (machine.api().visible) {
      wasVisible.set(true)
    }
  })

  const isUnmounted = computed(() => {
    const { lazyMount, unmountOnExit } = options.context()
    const visible = machine.api().visible
    return Boolean((!visible && !wasVisible() && lazyMount) || (unmountOnExit && !visible && wasVisible()))
  })

  return {
    ...machine,
    isUnmounted,
  }
}
