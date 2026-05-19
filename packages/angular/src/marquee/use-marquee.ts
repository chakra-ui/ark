import * as marquee from '@zag-js/marquee'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseMarqueeProps extends OptionalId<Omit<marquee.Props, 'dir' | 'getRootNode'>> {}

export type UseMarqueeReturn = UseMachineReturn<marquee.Service['state'], marquee.Api, marquee.Service>

export interface UseMarqueeOptions {
  context: () => UseMarqueeProps
}

type MarqueeContext = Record<string, unknown>
type MarqueeSchema = marquee.Machine extends Machine<infer TSchema> ? TSchema : never

export function useMarquee(options: UseMarqueeOptions): UseMarqueeReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('marquee')

  return useMachine<MarqueeSchema, marquee.Api>({
    machine: marquee.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as MarqueeContext
    },
    connect: (service, normalize) => marquee.connect(service, normalize),
  })
}
