import * as pagination from '@zag-js/pagination'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UsePaginationProps extends OptionalId<Omit<pagination.Props, 'dir' | 'getRootNode'>> {}

export type UsePaginationReturn = UseMachineReturn<pagination.Service['state'], pagination.Api, pagination.Service>

export interface UsePaginationOptions {
  context: () => UsePaginationProps
}

type PaginationContext = Record<string, unknown>
type PaginationSchema = pagination.Machine extends Machine<infer TSchema> ? TSchema : never

export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('pagination')

  return useMachine<PaginationSchema, pagination.Api>({
    machine: pagination.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as PaginationContext
    },
    connect: (service, normalize) => pagination.connect(service, normalize),
  })
}
