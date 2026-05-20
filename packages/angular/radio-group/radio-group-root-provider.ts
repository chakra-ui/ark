import type * as radioGroup from '@zag-js/radio-group'
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
import type { RadioGroupService } from './radio-group.types'
import { ARK_RADIO_GROUP_CONTEXT } from './use-radio-group-context'
import type { UseRadioGroupReturn } from './use-radio-group'

@Directive({
  selector: '[arkRadioGroupRootProvider]',
  standalone: true,
  exportAs: 'arkRadioGroupRootProvider',
  providers: [{ provide: ARK_RADIO_GROUP_CONTEXT, useExisting: forwardRef(() => ArkRadioGroupRootProvider) }],
})
export class ArkRadioGroupRootProvider implements UseRadioGroupReturn {
  /** The radio group primitive returned by useRadioGroup(). */
  readonly value: InputSignal<UseRadioGroupReturn> = input.required<UseRadioGroupReturn>()

  get state(): Signal<RadioGroupService['state']> {
    return this.value().state
  }
  get api(): Signal<radioGroup.Api> {
    return this.value().api
  }
  get service(): RadioGroupService {
    return this.value().service
  }
  get send(): RadioGroupService['send'] {
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
