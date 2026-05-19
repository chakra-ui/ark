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
import type { TourStepAction } from './tour.types'
import { injectArkTourContext } from './use-tour-context'

@Directive({
  selector: '[arkTourActionTrigger]',
  standalone: true,
  exportAs: 'arkTourActionTrigger',
})
export class ArkTourActionTrigger implements AfterContentInit {
  /** The step action this trigger performs. */
  readonly action: InputSignal<TourStepAction> = input.required<TourStepAction>()

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const tour = injectArkTourContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => tour.api().getActionTriggerProps({ action: this.action() }),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', this.action().label)
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
