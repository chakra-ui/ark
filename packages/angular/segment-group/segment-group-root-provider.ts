import type * as segmentGroup from '@zag-js/radio-group'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_SEGMENT_GROUP_CONTEXT } from './use-segment-group-context'
import type { UseSegmentGroupReturn } from './use-segment-group'

@Directive({
  selector: '[arkSegmentGroupRootProvider]',
  standalone: true,
  exportAs: 'arkSegmentGroupRootProvider',
  providers: [{ provide: ARK_SEGMENT_GROUP_CONTEXT, useExisting: forwardRef(() => ArkSegmentGroupRootProvider) }],
})
export class ArkSegmentGroupRootProvider implements UseSegmentGroupReturn {
  /** The segment group primitive returned by useSegmentGroup(). */
  readonly value: InputSignal<UseSegmentGroupReturn> = input.required<UseSegmentGroupReturn>()

  get state(): Signal<segmentGroup.Service['state']> {
    return this.value().state
  }
  get api(): Signal<segmentGroup.Api> {
    return this.value().api
  }
  get service(): segmentGroup.Service {
    return this.value().service
  }
  get send(): segmentGroup.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
