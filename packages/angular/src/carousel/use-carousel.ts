import * as carousel from '@zag-js/carousel'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseCarouselProps extends OptionalId<Omit<carousel.Props, 'dir' | 'getRootNode' | 'slideCount'>> {
  /** The total number of slides. */
  slideCount?: number | undefined
}

export type UseCarouselReturn = UseMachineReturn<carousel.Service['state'], carousel.Api, carousel.Service>

export interface UseCarouselOptions {
  context: () => UseCarouselProps
}

type CarouselContext = Record<string, unknown>
type CarouselSchema = carousel.Machine extends Machine<infer TSchema> ? TSchema : never

export function useCarousel(options: UseCarouselOptions): UseCarouselReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('carousel')

  return useMachine<CarouselSchema, carousel.Api>({
    machine: carousel.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
        slideCount: props.slideCount ?? 0,
      } as CarouselContext
    },
    connect: (service, normalize) => carousel.connect(service, normalize),
  })
}
