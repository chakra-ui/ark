import { DestroyRef, Directive, ElementRef, Renderer2, inject, input } from '@angular/core'
import { applyArkProps } from './_zag/apply-ark-props'
import type { ArkProps } from './types'

@Directive({ selector: '[arkProps]', standalone: true })
export class ArkPropsDirective {
  readonly arkProps = input<ArkProps | undefined>(undefined)

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: this.arkProps,
    })
  }
}
