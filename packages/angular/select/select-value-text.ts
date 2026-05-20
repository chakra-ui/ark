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
import { injectArkSelectContext } from './use-select-context'

@Directive({
  selector: '[arkSelectValueText]',
  standalone: true,
  exportAs: 'arkSelectValueText',
})
export class ArkSelectValueText implements AfterContentInit {
  /** Text to display when no value is selected. */
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined)

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const context = injectArkSelectContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getValueTextProps(),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      const api = context.api()
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'textContent',
        api.valueAsString || this.placeholder() || '',
      )
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
