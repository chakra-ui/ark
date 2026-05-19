import * as splitter from '@zag-js/splitter'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseSplitterProps extends OptionalId<Omit<splitter.Props, 'dir' | 'getRootNode'>> {}

export type UseSplitterReturn = UseMachineReturn<splitter.Service['state'], splitter.Api, splitter.Service>

export interface UseSplitterOptions {
  context: () => UseSplitterProps
}

type SplitterContext = Record<string, unknown>
type SplitterSchema = splitter.Machine extends Machine<infer TSchema> ? TSchema : never

export function useSplitter(options: UseSplitterOptions): UseSplitterReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('splitter')

  return useMachine<SplitterSchema, splitter.Api>({
    machine: splitter.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as SplitterContext
    },
    connect: (service, normalize) => splitter.connect(service, normalize),
  })
}
