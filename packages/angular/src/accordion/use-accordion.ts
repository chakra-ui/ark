import * as accordion from '@zag-js/accordion'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseAccordionProps extends OptionalId<Omit<accordion.Props, 'dir' | 'getRootNode'>> {}

export type UseAccordionReturn = UseMachineReturn<accordion.Service['state'], accordion.Api, accordion.Service>

export interface UseAccordionOptions {
  context: () => UseAccordionProps
}

type AccordionContext = Record<string, unknown>
type AccordionSchema = accordion.Machine extends Machine<infer TSchema> ? TSchema : never

export function useAccordion(options: UseAccordionOptions): UseAccordionReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('accordion')

  return useMachine<AccordionSchema, accordion.Api>({
    machine: accordion.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as AccordionContext
    },
    connect: (service, normalize) => accordion.connect(service, normalize),
  })
}
