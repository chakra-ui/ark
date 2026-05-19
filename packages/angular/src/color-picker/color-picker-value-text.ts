import {
  type AfterContentInit,
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  signal,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ColorPickerValueTextFormat } from './color-picker.types'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerValueText]',
  standalone: true,
  exportAs: 'arkColorPickerValueText',
})
export class ArkColorPickerValueText implements AfterContentInit {
  /** The string format used to render the color. */
  readonly format: InputSignal<ColorPickerValueTextFormat | undefined> = input<ColorPickerValueTextFormat | undefined>(
    undefined,
  )

  private readonly ownsTextContent = signal(false)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  constructor() {
    const context = injectArkColorPickerContext()
    const renderer = inject(Renderer2)
    applyArkProps({
      elementRef: this.elementRef,
      renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getValueTextProps(),
    })
    effect(() => {
      if (!this.ownsTextContent()) return
      const api = context.api()
      const value = this.format() ? api.value.toString(this.format()) : api.valueAsString
      renderer.setProperty(this.elementRef.nativeElement, 'textContent', value)
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(this.elementRef.nativeElement.childNodes.length === 0)
  }
}
