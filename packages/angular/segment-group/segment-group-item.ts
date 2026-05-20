import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { segmentGroupParts } from './segment-group.anatomy'
import type { SegmentGroupItemProps, SegmentGroupItemState } from './segment-group.types'
import { injectArkSegmentGroupContext } from './use-segment-group-context'
import { ARK_SEGMENT_GROUP_ITEM_CONTEXT, ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT } from './use-segment-group-item-context'

@Directive({
  selector: '[arkSegmentGroupItem]',
  standalone: true,
  exportAs: 'arkSegmentGroupItem',
  providers: [
    {
      provide: ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT,
      useFactory: (item: ArkSegmentGroupItem) => item.itemProps,
      deps: [forwardRef(() => ArkSegmentGroupItem)],
    },
    {
      provide: ARK_SEGMENT_GROUP_ITEM_CONTEXT,
      useFactory: (item: ArkSegmentGroupItem) => item.itemState,
      deps: [forwardRef(() => ArkSegmentGroupItem)],
    },
  ],
})
export class ArkSegmentGroupItem {
  /** The value of the item. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the item is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  private readonly segmentGroup = injectArkSegmentGroupContext()
  readonly itemProps: Signal<SegmentGroupItemProps> = computed(() => ({
    value: this.value(),
    disabled: this.disabled() || undefined,
    invalid: this.invalid() || undefined,
  }))
  readonly itemState: Signal<SegmentGroupItemState> = computed(() =>
    this.segmentGroup.api().getItemState(this.itemProps()),
  )

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        ...this.segmentGroup.api().getItemProps(this.itemProps()),
        ...segmentGroupParts.item.attrs,
      }),
    })
  }
}
