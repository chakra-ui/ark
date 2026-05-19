import { type AfterContentInit, DestroyRef, Directive, ElementRef, Renderer2, effect, inject, signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectColorPickerChannelProps } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerChannelSliderLabel]',
  standalone: true,
  exportAs: 'arkColorPickerChannelSliderLabel',
})
export class ArkColorPickerChannelSliderLabel implements AfterContentInit {
  private readonly ownsTextContent = signal(false)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  constructor() {
    const context = injectArkColorPickerContext()
    const channelProps = injectColorPickerChannelProps()
    const renderer = inject(Renderer2)
    applyArkProps({
      elementRef: this.elementRef,
      renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getChannelSliderLabelProps(channelProps()),
    })
    effect(() => {
      if (this.ownsTextContent())
        renderer.setProperty(this.elementRef.nativeElement, 'textContent', channelProps().channel)
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(this.elementRef.nativeElement.childNodes.length === 0)
  }
}
