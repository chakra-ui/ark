import { DestroyRef, Directive, ElementRef, type Signal, effect, inject, input } from '@angular/core'
import { type TrapFocusOptions, trapFocus } from '@zag-js/focus-trap'

export type { TrapFocusOptions }

@Directive({
  selector: '[arkFocusTrap]',
  standalone: true,
})
export class ArkFocusTrapDirective {
  readonly arkFocusTrap = input<boolean>(false)
  readonly arkFocusTrapOptions = input<TrapFocusOptions | undefined>(undefined)

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly destroyRef = inject(DestroyRef)
  private cleanup: (() => void) | undefined

  constructor() {
    effect(() => {
      const active = this.arkFocusTrap()
      const options = (this.arkFocusTrapOptions as Signal<TrapFocusOptions | undefined>)()
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
