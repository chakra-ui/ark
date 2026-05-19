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
import { datePickerAnatomy } from './date-picker.anatomy'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerValueText]',
  standalone: true,
  exportAs: 'arkDatePickerValueText',
})
export class ArkDatePickerValueText implements AfterContentInit {
  /** Text to display when no date is selected. */
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Separator between multiple selected values. */
  readonly separator: InputSignal<string> = input<string>(', ')

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => datePickerAnatomy.build().valueText.attrs,
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      const api = context.api()
      const text = api.value.length > 0 ? api.valueAsString.join(this.separator()) : this.placeholder()
      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', text ?? '')
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
