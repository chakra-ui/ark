import * as scrollArea from '@zag-js/scroll-area'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import type { ScrollAreaApi } from './scroll-area.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseScrollAreaProps extends OptionalId<Omit<scrollArea.Props, 'dir' | 'getRootNode'>> {}

export type UseScrollAreaReturn = UseMachineReturn<scrollArea.Service['state'], ScrollAreaApi, scrollArea.Service>

export interface UseScrollAreaOptions {
  context: () => UseScrollAreaProps
}

type ScrollAreaContext = Record<string, unknown>
type ScrollAreaSchema = scrollArea.Machine extends Machine<infer TSchema> ? TSchema : never

export function useScrollArea(options: UseScrollAreaOptions): UseScrollAreaReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('scroll-area')

  return useMachine<ScrollAreaSchema, ScrollAreaApi>({
    machine: scrollArea.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as ScrollAreaContext
    },
    connect: (service, normalize) => scrollArea.connect(service, normalize),
  })
}
