import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { checkboxAnatomy } from './checkbox.anatomy'
import { ARK_CHECKBOX_GROUP_CONTEXT } from './use-checkbox-group-context'
import { useCheckboxGroup, type UseCheckboxGroupReturn } from './use-checkbox-group'

@Directive({
  selector: '[arkCheckboxGroup]',
  standalone: true,
  exportAs: 'arkCheckboxGroup',
  providers: [{ provide: ARK_CHECKBOX_GROUP_CONTEXT, useExisting: forwardRef(() => ArkCheckboxGroup) }],
})
export class ArkCheckboxGroup implements UseCheckboxGroupReturn {
  /** The initial value of `value` when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled value of the checkbox group. */
  readonly valueModel: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined, { alias: 'value' })
  /** The name of the input fields in the checkbox group. */
  readonly nameInput: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'name' })
  /** If `true`, the checkbox group is disabled. */
  readonly disabledInput: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  })
  /** If `true`, the checkbox group is read-only. */
  readonly readOnlyInput: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'readOnly',
    transform: booleanAttribute,
  })
  /** If `true`, the checkbox group is invalid. */
  readonly invalidInput: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'invalid',
    transform: booleanAttribute,
  })
  /** The maximum number of selected values. */
  readonly maxSelectedValues: InputSignal<number | undefined> = input<number | undefined>(undefined)

  private readonly group = useCheckboxGroup({
    context: () => ({
      defaultValue: this.defaultValue(),
      value: this.valueModel(),
      name: this.nameInput(),
      disabled: this.disabledInput(),
      readOnly: this.readOnlyInput(),
      invalid: this.invalidInput(),
      maxSelectedValues: this.maxSelectedValues(),
      onValueChange: (value) => this.valueModel.set(value),
    }),
  })

  readonly value: Signal<string[]> = this.group.value
  readonly name: Signal<string | undefined> = this.group.name
  readonly disabled: Signal<boolean> = this.group.disabled
  readonly readOnly: Signal<boolean> = this.group.readOnly
  readonly invalid: Signal<boolean> = this.group.invalid

  isChecked(value: string | undefined): boolean {
    return this.group.isChecked(value)
  }

  setValue(value: string[]): void {
    this.group.setValue(value)
  }

  addValue(value: string): void {
    this.group.addValue(value)
  }

  removeValue(value: string): void {
    this.group.removeValue(value)
  }

  toggleValue(value: string): void {
    this.group.toggleValue(value)
  }

  getItemProps(
    props: Parameters<UseCheckboxGroupReturn['getItemProps']>[0],
  ): ReturnType<UseCheckboxGroupReturn['getItemProps']> {
    return this.group.getItemProps(props)
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({ role: 'group', ...checkboxAnatomy.build().group.attrs }),
    })
  }
}
