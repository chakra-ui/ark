import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as colorPicker from '@zag-js/color-picker'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_COLOR_PICKER_CHANNEL_PROPS, ARK_COLOR_PICKER_FORMAT_PROPS } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerChannelSlider]',
  standalone: true,
  exportAs: 'arkColorPickerChannelSlider',
  providers: [
    {
      provide: ARK_COLOR_PICKER_CHANNEL_PROPS,
      useFactory: (slider: ArkColorPickerChannelSlider) => slider.channelProps,
      deps: [forwardRef(() => ArkColorPickerChannelSlider)],
    },
  ],
})
export class ArkColorPickerChannelSlider {
  /** The color channel controlled by the slider. */
  readonly channel: InputSignal<colorPicker.ColorChannel> = input.required<colorPicker.ColorChannel>()
  /** The slider orientation. */
  readonly orientation: InputSignal<colorPicker.ChannelProps['orientation']> =
    input<colorPicker.ChannelProps['orientation']>(undefined)

  private readonly formatProps = inject(ARK_COLOR_PICKER_FORMAT_PROPS, { optional: true })
  readonly channelProps: Signal<colorPicker.ChannelProps> = computed(() => ({
    channel: this.channel(),
    orientation: this.orientation(),
  }))
  private readonly sliderProps: Signal<colorPicker.ChannelSliderProps> = computed(() => ({
    ...this.channelProps(),
    ...(this.formatProps?.() ?? {}),
  }))

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getChannelSliderProps(this.sliderProps()),
    })
  }
}
