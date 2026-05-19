import * as tour from '@zag-js/tour'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseTourProps extends OptionalId<Omit<tour.Props, 'dir' | 'getRootNode'>> {}

export type UseTourReturn = UseMachineReturn<tour.Service['state'], tour.Api, tour.Service>

export interface UseTourOptions {
  context: () => UseTourProps
}

type TourContext = Record<string, unknown>
type TourSchema = tour.Machine extends Machine<infer TSchema> ? TSchema : never

export function useTour(options: UseTourOptions): UseTourReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('tour')
  ensureVisualViewportGlobal()

  return useMachine<TourSchema, tour.Api>({
    machine: tour.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as TourContext
    },
    connect: (service, normalize) => tour.connect(service, normalize),
  })
}

function ensureVisualViewportGlobal(): void {
  if (typeof globalThis.visualViewport !== 'undefined') return
  Object.defineProperty(globalThis, 'visualViewport', {
    configurable: true,
    writable: true,
    value: null,
  })
}
