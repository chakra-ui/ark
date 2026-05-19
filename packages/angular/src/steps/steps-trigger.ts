import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'
import { injectArkStepsItemPropsContext } from './use-steps-item-context'

@Directive({
  selector: '[arkStepsTrigger]',
  standalone: true,
  exportAs: 'arkStepsTrigger',
})
export class ArkStepsTrigger {
  constructor() {
    const context = injectArkStepsContext()
    const itemProps = injectArkStepsItemPropsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps(itemProps()),
    })
  }
}
