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
import { ARK_COLOR_PICKER_AREA_PROPS } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerArea]',
  standalone: true,
  exportAs: 'arkColorPickerArea',
  providers: [
    {
      provide: ARK_COLOR_PICKER_AREA_PROPS,
      useFactory: (area: ArkColorPickerArea) => area.areaProps,
      deps: [forwardRef(() => ArkColorPickerArea)],
    },
  ],
})
export class ArkColorPickerArea {
  /** The horizontal channel controlled by the color area. */
  readonly xChannel: InputSignal<colorPicker.ColorChannel | undefined> = input<colorPicker.ColorChannel | undefined>(
    undefined,
  )
  /** The vertical channel controlled by the color area. */
  readonly yChannel: InputSignal<colorPicker.ColorChannel | undefined> = input<colorPicker.ColorChannel | undefined>(
    undefined,
  )

  readonly areaProps: Signal<colorPicker.AreaProps> = computed(() => ({
    xChannel: this.xChannel(),
    yChannel: this.yChannel(),
  }))

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getAreaProps(this.areaProps()),
    })
  }
}
