import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  signal,
  type AfterContentInit,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { DatePickerCell } from './date-picker.types'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerYearSelect]',
  standalone: true,
  exportAs: 'arkDatePickerYearSelect',
})
export class ArkDatePickerYearSelect implements AfterContentInit {
  private readonly elementRef = inject<ElementRef<HTMLSelectElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsOptions = signal(false)
  private createdOptions: HTMLElement[] = []

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getYearSelectProps(),
    })

    effect(() => {
      if (!this.ownsOptions()) return
      this.syncOptions(context.api().getYears())
    })
  }

  ngAfterContentInit(): void {
    this.ownsOptions.set(this.elementRef.nativeElement.childNodes.length === 0)
  }

  private syncOptions(options: DatePickerCell[]): void {
    const select = this.elementRef.nativeElement
    for (const option of this.createdOptions) {
      this.renderer.removeChild(select, option)
    }
    this.createdOptions = options.map((item) => {
      const option = this.renderer.createElement('option') as HTMLOptionElement
      this.renderer.setProperty(option, 'value', String(item.value))
      this.renderer.setProperty(option, 'textContent', item.label)
      this.renderer.setProperty(option, 'disabled', Boolean(item.disabled))
      this.renderer.appendChild(select, option)
      return option
    })
  }
}
