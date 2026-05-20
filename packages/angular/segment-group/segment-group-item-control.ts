import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { segmentGroupParts } from './segment-group.anatomy'
import { injectArkSegmentGroupContext } from './use-segment-group-context'
import { injectArkSegmentGroupItemPropsContext } from './use-segment-group-item-context'

@Directive({
  selector: '[arkSegmentGroupItemControl]',
  standalone: true,
  exportAs: 'arkSegmentGroupItemControl',
})
export class ArkSegmentGroupItemControl {
  constructor() {
    const segmentGroup = injectArkSegmentGroupContext()
    const itemProps = injectArkSegmentGroupItemPropsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        ...segmentGroup.api().getItemControlProps(itemProps()),
        ...segmentGroupParts.itemControl.attrs,
      }),
    })
  }
}
