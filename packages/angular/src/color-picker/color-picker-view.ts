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
import { ARK_COLOR_PICKER_FORMAT_PROPS } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerView]',
  standalone: true,
  exportAs: 'arkColorPickerView',
  providers: [
    {
      provide: ARK_COLOR_PICKER_FORMAT_PROPS,
      useFactory: (view: ArkColorPickerView) => view.formatProps,
      deps: [forwardRef(() => ArkColorPickerView)],
    },
  ],
})
export class ArkColorPickerView {
  /** The color format rendered by this view. */
  readonly format: InputSignal<colorPicker.ColorFormat> = input.required<colorPicker.ColorFormat>()

  readonly formatProps: Signal<{ format: colorPicker.ColorFormat }> = computed(() => ({ format: this.format() }))

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        'data-scope': 'color-picker',
        'data-part': 'view',
        'data-format': this.format(),
        hidden: context.api().format !== this.format(),
      }),
    })
  }
}
