import type * as toggleGroup from '@zag-js/toggle-group'
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
import { ARK_TOGGLE_GROUP_CONTEXT } from './use-toggle-group-context'
import type { UseToggleGroupReturn } from './use-toggle-group'

@Directive({
  selector: '[arkToggleGroupRootProvider]',
  standalone: true,
  exportAs: 'arkToggleGroupRootProvider',
  providers: [{ provide: ARK_TOGGLE_GROUP_CONTEXT, useExisting: forwardRef(() => ArkToggleGroupRootProvider) }],
})
export class ArkToggleGroupRootProvider implements UseToggleGroupReturn {
  readonly value: InputSignal<UseToggleGroupReturn> = input.required<UseToggleGroupReturn>()

  get state(): Signal<toggleGroup.Service['state']> {
    return this.value().state
  }
  get api(): Signal<toggleGroup.Api> {
    return this.value().api
  }
  get service(): toggleGroup.Service {
    return this.value().service
  }
  get send(): toggleGroup.Service['send'] {
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
