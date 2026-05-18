import { DestroyRef, Directive, ElementRef, booleanAttribute, effect, inject, input } from '@angular/core'
import { type TrapFocusOptions, trapFocus } from '@zag-js/focus-trap'

export type * from '@zag-js/focus-trap'

export interface FocusTrapProps {
  arkFocusTrap?: boolean
  arkFocusTrapOptions?: TrapFocusOptions
}

@Directive({
  selector: '[arkFocusTrap]',
  standalone: true,
})
export class ArkFocusTrapDirective {
  readonly arkFocusTrap = input(false, { transform: booleanAttribute })
  readonly arkFocusTrapOptions = input<TrapFocusOptions | undefined>(undefined)

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly destroyRef = inject(DestroyRef)
  private cleanup: (() => void) | undefined

  constructor() {
    effect(() => {
      const active = this.arkFocusTrap()
      const options = this.arkFocusTrapOptions()
      this.tearDown()
      if (active) {
        this.cleanup = trapFocus(this.elementRef.nativeElement, options)
      }
    })

    this.destroyRef.onDestroy(() => {
      this.tearDown()
    })
  }

  private tearDown(): void {
    const cleanup = this.cleanup
    if (cleanup) {
      this.cleanup = undefined
      cleanup()
    }
  }
}
