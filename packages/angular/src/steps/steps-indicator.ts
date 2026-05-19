import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'
import { injectArkStepsItemPropsContext } from './use-steps-item-context'

@Directive({
  selector: '[arkStepsIndicator]',
  standalone: true,
  exportAs: 'arkStepsIndicator',
})
export class ArkStepsIndicator {
  constructor() {
    const context = injectArkStepsContext()
    const itemProps = injectArkStepsItemPropsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(itemProps()),
    })
  }
}
