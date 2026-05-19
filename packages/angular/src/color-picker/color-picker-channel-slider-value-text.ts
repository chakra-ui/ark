import { type AfterContentInit, DestroyRef, Directive, ElementRef, Renderer2, effect, inject, signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { injectColorPickerChannelProps } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerChannelSliderValueText]',
  standalone: true,
  exportAs: 'arkColorPickerChannelSliderValueText',
})
export class ArkColorPickerChannelSliderValueText implements AfterContentInit {
  private readonly ownsTextContent = signal(false)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  constructor() {
    const locale = injectArkLocale()
    const context = injectArkColorPickerContext()
    const channelProps = injectColorPickerChannelProps()
    const renderer = inject(Renderer2)
    applyArkProps({
      elementRef: this.elementRef,
      renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getChannelSliderValueTextProps(channelProps()),
    })
    effect(() => {
      if (!this.ownsTextContent()) return
      renderer.setProperty(
        this.elementRef.nativeElement,
        'textContent',
        context.api().getChannelValueText(channelProps().channel, locale.locale),
      )
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(this.elementRef.nativeElement.childNodes.length === 0)
  }
}
