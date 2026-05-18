import type { EnvironmentInjector, Injector, Signal } from '@angular/core'
import type { Machine, MachineSchema, Service } from '@zag-js/core'
import type { NormalizeProps, PropTypes } from '@zag-js/types'

export interface UseMachineReturn<TState, TApi, TService> {
  readonly state: Signal<TState>
  readonly send: TService extends { send: infer TSend } ? TSend : never
  readonly service: TService
  readonly api: Signal<TApi>
}

export interface UseMachineOptions<TSchema extends MachineSchema, TApi> {
  machine: Machine<TSchema>
  context: () => Partial<TSchema['props']>
  connect: (service: Service<TSchema>, normalizeProps: NormalizeProps<PropTypes<Record<string, unknown>>>) => TApi
}

export interface ArkContextCarrier<TRoot> {
  readonly originInjector: Injector
  readonly environmentInjector: EnvironmentInjector
  readonly elementInjector: Injector
  readonly root: TRoot
}
