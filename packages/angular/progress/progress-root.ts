import type * as progress from '@zag-js/progress'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type ModelSignal,
  type Signal,
  forwardRef,
  inject,
  input,
  model,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ProgressElementIds } from './progress.types'
import { ARK_PROGRESS_CONTEXT } from './use-progress-context'
import { useProgress, type UseProgressReturn } from './use-progress'

@Directive({
  selector: '[arkProgress]',
  standalone: true,
  exportAs: 'arkProgress',
  providers: [{ provide: ARK_PROGRESS_CONTEXT, useExisting: forwardRef(() => ArkProgressRoot) }],
})
export class ArkProgressRoot implements UseProgressReturn {
  /** The unique identifier of the progress bar. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the progress bar. Useful for composition. */
  readonly ids: InputSignal<Partial<ProgressElementIds> | undefined> = input<Partial<ProgressElementIds> | undefined>(
    undefined,
  )
  /** The controlled value of the progress bar. */
  readonly value: ModelSignal<number | null | undefined> = model<number | null | undefined>(undefined)
  /** The initial value of the progress bar when uncontrolled. */
  readonly defaultValue: InputSignal<number | null | undefined> = input<number | null | undefined>(undefined)
  /** The minimum allowed value of the progress bar. */
  readonly min: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The maximum allowed value of the progress bar. */
  readonly max: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The orientation of the progress bar. */
  readonly orientation: InputSignal<'horizontal' | 'vertical' | undefined> = input<
    'horizontal' | 'vertical' | undefined
  >(undefined)
  /** The options to use for formatting the value. */
  readonly formatOptions: InputSignal<Intl.NumberFormatOptions | undefined> = input<
    Intl.NumberFormatOptions | undefined
  >(undefined)

  private readonly machine = useProgress({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      min: this.min(),
      max: this.max(),
      orientation: this.orientation(),
      formatOptions: this.formatOptions(),
      onValueChange: (details) => this.value.set(details.value),
    }),
  })

  readonly state: Signal<progress.Service['state']> = this.machine.state
  readonly api: Signal<progress.Api> = this.machine.api
  readonly service: progress.Service = this.machine.service
  readonly send: progress.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
