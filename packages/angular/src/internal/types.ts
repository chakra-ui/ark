import type { DestroyRef, ElementRef, EnvironmentInjector, Injector, Renderer2, Signal } from '@angular/core'
import type { ArkProps } from '../types'

// TODO step 6: replace with typeof normalizeProps
type NormalizePropsLike = <T extends Record<string, unknown>>(props: T) => T

export interface UseMachineReturn<TState, TApi, TService> {
  readonly state: Signal<TState>
  readonly send: TService extends { send: infer TSend } ? TSend : never
  readonly service: TService
  readonly api: Signal<TApi>
}

export interface UseMachineOptions<TContext, TState, TApi, TService> {
  machine: { start: (context: TContext) => TService }
  context: () => TContext
  connect: (
    state: TState,
    send: UseMachineReturn<TState, TApi, TService>['send'],
    normalizeProps: NormalizePropsLike,
  ) => TApi
}

export interface ApplyArkPropsOptions {
  elementRef: ElementRef<HTMLElement>
  renderer: Renderer2
  destroyRef: DestroyRef
  props: () => ArkProps | undefined
}

export interface ArkContextCarrier<TRoot> {
  readonly originInjector: Injector
  readonly environmentInjector: EnvironmentInjector
  readonly elementInjector: Injector
  readonly root: TRoot
}
