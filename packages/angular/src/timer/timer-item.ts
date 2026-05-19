import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  signal,
  type AfterContentInit,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { TimerTimePart } from './timer.types'
import { injectArkTimerContext } from './use-timer-context'

@Directive({
  selector: '[arkTimerItem]',
  standalone: true,
  exportAs: 'arkTimerItem',
})
export class ArkTimerItem implements AfterContentInit {
  /** The timer part to render. */
  readonly type: InputSignal<TimerTimePart> = input.required<TimerTimePart>()

  private readonly ownsTextContent = signal(false)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  constructor() {
    const timer = injectArkTimerContext()
    const renderer = inject(Renderer2)

    applyArkProps({
      elementRef: this.elementRef,
      renderer,
      destroyRef: inject(DestroyRef),
      props: () => timer.api().getItemProps({ type: this.type() }),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      renderer.setProperty(this.elementRef.nativeElement, 'textContent', timer.api().formattedTime[this.type()])
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(this.elementRef.nativeElement.childNodes.length === 0)
  }
}
