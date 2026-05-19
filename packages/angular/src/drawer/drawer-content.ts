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
import { injectArkDrawerContext } from './use-drawer-context'

@Directive({
  selector: '[arkDrawerContent]',
  standalone: true,
  exportAs: 'arkDrawerContent',
})
export class ArkDrawerContent {
  /** Whether the drawer content is draggable. */
  readonly draggable: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })

  constructor() {
    const context = injectArkDrawerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps({ draggable: this.draggable() }),
    })
  }
}
