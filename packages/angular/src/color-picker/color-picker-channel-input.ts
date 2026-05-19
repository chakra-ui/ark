import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import type * as colorPicker from '@zag-js/color-picker'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: 'input[arkColorPickerChannelInput]',
  standalone: true,
  exportAs: 'arkColorPickerChannelInput',
})
export class ArkColorPickerChannelInput {
  /** The color channel controlled by the input. */
  readonly channel: InputSignal<colorPicker.ExtendedColorChannel> = input.required<colorPicker.ExtendedColorChannel>()
  /** The input orientation. */
  readonly orientation: InputSignal<colorPicker.ChannelInputProps['orientation']> =
    input<colorPicker.ChannelInputProps['orientation']>(undefined)

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getChannelInputProps({ channel: this.channel(), orientation: this.orientation() }),
    })
  }
}
