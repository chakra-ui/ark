import type * as zagSwitch from '@zag-js/switch'
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
import type { SwitchCheckedChangeDetails, SwitchElementIds } from './switch.types'
import { ARK_SWITCH_CONTEXT } from './use-switch-context'
import { useSwitch, type UseSwitchReturn } from './use-switch'

@Directive({
  selector: '[arkSwitch]',
  standalone: true,
  exportAs: 'arkSwitch',
  providers: [
    { provide: ARK_SWITCH_CONTEXT, useExisting: forwardRef(() => ArkSwitchRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkSwitchRoot), multi: true },
  ],
})
export class ArkSwitchRoot implements ControlValueAccessor, UseSwitchReturn {
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly elementIds: InputSignal<SwitchElementIds | undefined> = input<SwitchElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  readonly checked: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  readonly defaultChecked: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly label: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly value: InputSignal<string | number | undefined> = input<string | number | undefined>(undefined)

  private readonly disabledFromForm = signal(false)
  private pendingInternalWrites = 0
  private hasExternalBinding = false
  private hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<boolean>({
    value: this.checked,
    setDisabled: (disabled) => this.disabledFromForm.set(disabled),
    componentName: 'ArkSwitchRoot',
    hasExternalModelBinding: () => this.hasExternalBinding,
  })

  private readonly machine = useSwitch({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      checked: this.checked(),
      defaultChecked: this.defaultChecked(),
      disabled: this.disabled() || this.disabledFromForm() || undefined,
      invalid: this.invalid() || undefined,
      readOnly: this.readOnly() || undefined,
      required: this.required() || undefined,
      name: this.name(),
      form: this.form(),
      label: this.label(),
      value: this.value(),
      onCheckedChange: (details: SwitchCheckedChangeDetails) => {
        if (this.checked() !== details.checked) {
          this.pendingInternalWrites++
          this.checked.set(details.checked)
        }
        this.cva.notifyValueChange(details.checked)
      },
    }),
  })

  readonly state: Signal<zagSwitch.Service['state']> = this.machine.state
  readonly api: Signal<zagSwitch.Api> = this.machine.api
  readonly service: zagSwitch.Service = this.machine.service
  readonly send: zagSwitch.Service['send'] = this.machine.send

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
      this.hasExternalBinding = true
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  writeValue(value: boolean | null): void {
    const next = value === null ? undefined : value
    const current = this.checked()
    if (!this.hasReceivedFormWrite && current !== undefined) {
      this.hasExternalBinding = true
    }
    this.hasReceivedFormWrite = true
    if (current !== next) {
      this.pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: boolean | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
