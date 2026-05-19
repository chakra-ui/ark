import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'
import { injectArkStepsItemPropsContext } from './use-steps-item-context'

@Directive({
  selector: '[arkStepsSeparator]',
  standalone: true,
  exportAs: 'arkStepsSeparator',
})
export class ArkStepsSeparator {
  constructor() {
    const context = injectArkStepsContext()
    const itemProps = injectArkStepsItemPropsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSeparatorProps(itemProps()),
    })
  }
}
