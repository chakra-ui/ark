import { InjectionToken, type Signal, inject } from '@angular/core'
import type { DrawerStack, DrawerStackApi } from './drawer.types'

export interface UseDrawerStackContext {
  readonly api: Signal<DrawerStackApi>
  readonly stack: DrawerStack
}

export const ARK_DRAWER_STACK_CONTEXT = new InjectionToken<UseDrawerStackContext>('ARK_DRAWER_STACK_CONTEXT')

export function injectArkDrawerStackContext(): UseDrawerStackContext {
  return inject(ARK_DRAWER_STACK_CONTEXT)
}

export function injectArkDrawerStackContextOptional(): UseDrawerStackContext | null {
  return inject(ARK_DRAWER_STACK_CONTEXT, { optional: true })
}
