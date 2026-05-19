import { InjectionToken, type Signal, inject } from '@angular/core'
import type { StepsItemProps, StepsItemState } from './steps.types'

export type UseStepsItemContext = Signal<StepsItemState>
export type UseStepsItemPropsContext = Signal<StepsItemProps>

export const ARK_STEPS_ITEM_CONTEXT = new InjectionToken<UseStepsItemContext>('ARK_STEPS_ITEM_CONTEXT')
export const ARK_STEPS_ITEM_PROPS_CONTEXT = new InjectionToken<UseStepsItemPropsContext>('ARK_STEPS_ITEM_PROPS_CONTEXT')

export function injectArkStepsItemContext(): UseStepsItemContext {
  return inject(ARK_STEPS_ITEM_CONTEXT)
}

export function injectArkStepsItemPropsContext(): UseStepsItemPropsContext {
  return inject(ARK_STEPS_ITEM_PROPS_CONTEXT)
}
