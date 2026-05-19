import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as collapsible from '@zag-js/collapsible'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_COLLAPSIBLE_CONTEXT } from './use-collapsible-context'
import type { UseCollapsibleReturn } from './use-collapsible'

@Directive({
  selector: '[arkCollapsibleRootProvider]',
  standalone: true,
  exportAs: 'arkCollapsibleRootProvider',
  providers: [{ provide: ARK_COLLAPSIBLE_CONTEXT, useExisting: forwardRef(() => ArkCollapsibleRootProvider) }],
})
export class ArkCollapsibleRootProvider implements UseCollapsibleReturn {
  /** The collapsible machine returned by useCollapsible(). */
  readonly value: InputSignal<UseCollapsibleReturn> = input.required<UseCollapsibleReturn>()
  readonly state: Signal<collapsible.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<collapsible.Api> = computed(() => this.value().api())
  readonly isUnmounted: Signal<boolean> = computed(() => this.value().isUnmounted())
  readonly send: collapsible.Service['send'] = (event) => this.value().send(event)

  get service(): collapsible.Service {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
