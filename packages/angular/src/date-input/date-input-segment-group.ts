import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDateInputContext } from './use-date-input-context'

export interface DateInputSegmentGroupContext {
  index: InputSignal<number | undefined>
}

export const ARK_DATE_INPUT_SEGMENT_GROUP_CONTEXT = new InjectionToken<DateInputSegmentGroupContext>(
  'ARK_DATE_INPUT_SEGMENT_GROUP_CONTEXT',
)

export function injectArkDateInputSegmentGroupContext(): DateInputSegmentGroupContext {
  return inject(ARK_DATE_INPUT_SEGMENT_GROUP_CONTEXT)
}

@Directive({
  selector: '[arkDateInputSegmentGroup]',
  standalone: true,
  exportAs: 'arkDateInputSegmentGroup',
  providers: [
    { provide: ARK_DATE_INPUT_SEGMENT_GROUP_CONTEXT, useExisting: forwardRef(() => ArkDateInputSegmentGroup) },
  ],
})
export class ArkDateInputSegmentGroup implements DateInputSegmentGroupContext {
  /** The range index for this segment group. */
  readonly index: InputSignal<number | undefined> = input<number | undefined>(undefined)

  constructor() {
    const context = injectArkDateInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSegmentGroupProps({ index: this.index() }),
    })
  }
}
