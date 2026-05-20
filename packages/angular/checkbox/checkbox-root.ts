import type * as checkbox from '@zag-js/checkbox'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createArkCvaController } from '@ark-ui/angular/src/internal'
import type { CheckboxCheckedChangeDetails, CheckboxCheckedState, CheckboxElementIds } from './checkbox.types'
import { ARK_CHECKBOX_CONTEXT } from './use-checkbox-context'
import { injectArkCheckboxGroupContextOptional } from './use-checkbox-group-context'
import { useCheckbox, type UseCheckboxReturn } from './use-checkbox'

@Directive({
  selector: '[arkCheckbox]',
  standalone: true,
  exportAs: 'arkCheckbox',
  providers: [
    { provide: ARK_CHECKBOX_CONTEXT, useExisting: forwardRef(() => ArkCheckboxRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkCheckboxRoot), multi: true },
  ],
})
export class ArkCheckboxRoot implements ControlValueAccessor, UseCheckboxReturn {
  /** The id of the checkbox. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the checkbox parts. */
  readonly elementIds: InputSignal<CheckboxElementIds | undefined> = input<CheckboxElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The controlled checked state of the checkbox. */
  readonly checked: ModelSignal<CheckboxCheckedState | undefined> = model<CheckboxCheckedState | undefined>(undefined)
  /** The initial checked state of the checkbox when uncontrolled. */
  readonly defaultChecked: InputSignalWithTransform<CheckboxCheckedState | undefined, unknown> = input<
    CheckboxCheckedState | undefined,
    unknown
  >(undefined, {
    transform: (value) =>
      typeof value === 'boolean' ? value : value === 'indeterminate' ? value : booleanAttribute(value),
  })
  /** Whether the checkbox is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the checkbox is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the checkbox is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the checkbox is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name of the input field in the checkbox. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The id of the form that the checkbox belongs to. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The value of checkbox input. */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)

  private readonly group = injectArkCheckboxGroupContextOptional()
  private readonly disabledFromForm = signal(false)
  private pendingInternalWrites = 0
  private hasExternalCheckedBinding = false
  private hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<CheckboxCheckedState>({
    value: this.checked,
    setDisabled: (disabled) => this.disabledFromForm.set(disabled),
    componentName: 'ArkCheckboxRoot',
    hasExternalModelBinding: () => this.hasExternalCheckedBinding,
  })

  private readonly machine = useCheckbox({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      checked: this.checked(),
      defaultChecked: this.defaultChecked(),
      disabled: this.disabled() || this.disabledFromForm() || undefined,
      invalid: this.invalid() || undefined,
      required: this.required() || undefined,
      readOnly: this.readOnly() || undefined,
      name: this.name(),
      form: this.form(),
      value: this.value(),
      onCheckedChange: (details: CheckboxCheckedChangeDetails) => {
        const shouldWriteModel = !this.group || this.hasExternalCheckedBinding || this.checked() !== undefined
        if (shouldWriteModel && this.checked() !== details.checked) {
          this.pendingInternalWrites++
          this.checked.set(details.checked)
        }
        this.cva.notifyValueChange(details.checked)
      },
    }),
  })

  readonly state: Signal<checkbox.Service['state']> = this.machine.state
  readonly api: Signal<checkbox.Api> = this.machine.api
  readonly service: checkbox.Service = this.machine.service
  readonly send: checkbox.Service['send'] = this.machine.send

  constructor() {
    let firstRun = true
    effect(() => {
      void this.checked()
      if (firstRun) {
        firstRun = false
        this.pendingInternalWrites = 0
        return
      }
      if (this.pendingInternalWrites > 0) {
        this.pendingInternalWrites--
        return
      }
      this.hasExternalCheckedBinding = true
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  markTouched(): void {
    this.cva.markTouched()
  }

  writeValue(value: CheckboxCheckedState | null): void {
    const next = value === null ? undefined : value
    const current = this.checked()
    if (!this.hasReceivedFormWrite && current !== undefined) {
      this.hasExternalCheckedBinding = true
    }
    this.hasReceivedFormWrite = true
    if (current !== next) {
      this.pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: CheckboxCheckedState | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
