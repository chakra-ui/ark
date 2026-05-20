import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { segmentGroupParts } from './segment-group.anatomy'
import { injectArkSegmentGroupContext } from './use-segment-group-context'

@Directive({
  selector: '[arkSegmentGroupIndicator]',
  standalone: true,
  exportAs: 'arkSegmentGroupIndicator',
})
export class ArkSegmentGroupIndicator {
  constructor() {
    const segmentGroup = injectArkSegmentGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        ...segmentGroup.api().getIndicatorProps(),
        ...segmentGroupParts.indicator.attrs,
      }),
    })
  }
}
