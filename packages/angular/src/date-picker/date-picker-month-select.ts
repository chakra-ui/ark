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
  selector: '[arkDatePickerMonthSelect]',
  standalone: true,
  exportAs: 'arkDatePickerMonthSelect',
})
export class ArkDatePickerMonthSelect implements AfterContentInit {
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
      props: () => context.api().getMonthSelectProps(),
    })

    effect(() => {
      if (!this.ownsOptions()) return
      this.syncOptions(context.api().getMonths())
    })
  }

  ngAfterContentInit(): void {
    this.ownsOptions.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
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

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
