import {
  type ComponentRef,
  createComponent,
  type EmbeddedViewRef,
  type EnvironmentInjector,
  type Injector,
  type TemplateRef,
  type Type,
  type ViewContainerRef,
} from '@angular/core'
import type { ArkContextCarrier } from './types'

export interface CreateArkContextCarrierOptions<TRoot> {
  originInjector: Injector
  environmentInjector: EnvironmentInjector
  elementInjector: Injector
  root: TRoot
}

export function createArkContextCarrier<TRoot>(
  options: CreateArkContextCarrierOptions<TRoot>,
): ArkContextCarrier<TRoot> {
  return {
    originInjector: options.originInjector,
    environmentInjector: options.environmentInjector,
    elementInjector: options.elementInjector,
    root: options.root,
  }
}

export function createEmbeddedViewWithCarrier<C, TRoot>(
  viewContainer: ViewContainerRef,
  template: TemplateRef<C>,
  carrier: ArkContextCarrier<TRoot>,
  context?: C,
): EmbeddedViewRef<C> {
  return viewContainer.createEmbeddedView(template, context, {
    injector: carrier.elementInjector,
  })
}

export function createComponentWithCarrier<C, TRoot>(
  component: Type<C>,
  carrier: ArkContextCarrier<TRoot>,
): ComponentRef<C> {
  return createComponent(component, {
    environmentInjector: carrier.environmentInjector,
    elementInjector: carrier.elementInjector,
  })
}
