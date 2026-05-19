import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { DrawerSwipeDirection } from './drawer.types'
import { injectArkDrawerContext } from './use-drawer-context'

@Directive({
  selector: '[arkDrawerSwipeArea]',
  standalone: true,
  exportAs: 'arkDrawerSwipeArea',
})
export class ArkDrawerSwipeArea {
  /** Whether the swipe area is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The swipe direction that opens the drawer. */
  readonly swipeDirection: InputSignal<DrawerSwipeDirection | undefined> = input<DrawerSwipeDirection | undefined>(
    undefined,
  )

  constructor() {
    const context = injectArkDrawerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getSwipeAreaProps({ disabled: this.disabled(), swipeDirection: this.swipeDirection() }),
    })
  }
}
