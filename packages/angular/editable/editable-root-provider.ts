import type * as editable from '@zag-js/editable'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_EDITABLE_CONTEXT } from './use-editable-context'
import type { UseEditableReturn } from './use-editable'

@Directive({
  selector: '[arkEditableRootProvider]',
  standalone: true,
  exportAs: 'arkEditableRootProvider',
  providers: [{ provide: ARK_EDITABLE_CONTEXT, useExisting: forwardRef(() => ArkEditableRootProvider) }],
})
export class ArkEditableRootProvider implements UseEditableReturn {
  /** The editable primitive returned by useEditable(). */
  readonly value: InputSignal<UseEditableReturn> = input.required<UseEditableReturn>()

  get state(): Signal<editable.Service['state']> {
    return this.value().state
  }
  get api(): Signal<editable.Api> {
    return this.value().api
  }
  get service(): editable.Service {
    return this.value().service
  }
  get send(): editable.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
