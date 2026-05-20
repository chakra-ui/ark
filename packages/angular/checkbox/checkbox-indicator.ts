import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCheckboxContext } from './use-checkbox-context'

@Directive({
  selector: '[arkCheckboxIndicator]',
  standalone: true,
  exportAs: 'arkCheckboxIndicator',
})
export class ArkCheckboxIndicator {
  /** Whether this indicator should render for the indeterminate state. */
  readonly indeterminate: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const context = injectArkCheckboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = context.api()
        return {
          ...api.getIndicatorProps(),
          hidden: this.indeterminate() ? !api.indeterminate : !api.checked,
        }
      },
    })
  }
}
