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
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { RadioGroupItemProps } from './radio-group.types'
import { injectArkRadioGroupContext } from './use-radio-group-context'
import { ARK_RADIO_GROUP_ITEM_CONTEXT, type ArkRadioGroupItemContext } from './use-radio-group-item-context'

const optionalBooleanAttribute = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value)

@Directive({
  selector: '[arkRadioGroupItem]',
  standalone: true,
  exportAs: 'arkRadioGroupItem',
  providers: [{ provide: ARK_RADIO_GROUP_ITEM_CONTEXT, useExisting: forwardRef(() => ArkRadioGroupItem) }],
})
export class ArkRadioGroupItem implements ArkRadioGroupItemContext {
  /** The value of the radio item. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the radio item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** Whether the radio item is invalid. */
  readonly invalid: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )

  private readonly context = injectArkRadioGroupContext()

  readonly itemState = computed(() => this.context.api().getItemState(this.itemProps()))

  itemProps(): RadioGroupItemProps {
    return {
      value: this.value(),
      disabled: this.disabled(),
      invalid: this.invalid(),
    }
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.context.api().getItemProps(this.itemProps()),
    })
  }
}
