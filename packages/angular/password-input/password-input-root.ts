import type * as passwordInput from '@zag-js/password-input'
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
import { createArkCvaController } from '../src/forms/control-value-accessor'
import type {
  PasswordInputElementIds,
  PasswordInputIntlTranslations,
  PasswordInputVisibilityChangeDetails,
} from './password-input.types'
import {
  ARK_PASSWORD_INPUT_CONTEXT,
  ARK_PASSWORD_INPUT_VALUE_WRITER,
  type PasswordInputValueWriter,
} from './use-password-input-context'
import { usePasswordInput, type UsePasswordInputReturn } from './use-password-input'

@Directive({
  selector: '[arkPasswordInputRoot]',
  standalone: true,
  exportAs: 'arkPasswordInputRoot',
  providers: [
    { provide: ARK_PASSWORD_INPUT_CONTEXT, useExisting: forwardRef(() => ArkPasswordInputRoot) },
    { provide: ARK_PASSWORD_INPUT_VALUE_WRITER, useExisting: forwardRef(() => ArkPasswordInputRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkPasswordInputRoot), multi: true },
  ],
})
export class ArkPasswordInputRoot implements ControlValueAccessor, UsePasswordInputReturn, PasswordInputValueWriter {
  /** The id of the password input. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the password input parts. */
  readonly elementIds: InputSignal<PasswordInputElementIds | undefined> = input<PasswordInputElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  /** The controlled value of the password input. */
  readonly value: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial value of the password input when uncontrolled. */
  readonly defaultValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The controlled visibility of the password input. */
  readonly visible: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial visibility of the password input when uncontrolled. */
  readonly defaultVisible: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the password input is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the password input is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the password input is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the password input is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name attribute of the password input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The autocomplete attribute for the password input. */
  readonly autoComplete: InputSignal<'current-password' | 'new-password' | undefined> = input<
    'current-password' | 'new-password' | undefined
  >(undefined)
  /** Whether to ignore password managers. */
  readonly ignorePasswordManagers: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** The translations for the password input. */
  readonly translations: InputSignal<PasswordInputIntlTranslations | undefined> = input<
    PasswordInputIntlTranslations | undefined
  >(undefined)

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _lastFormValue: string | undefined = undefined

  private readonly cva = createArkCvaController<string>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkPasswordInputRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = usePasswordInput({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      visible: this.visible(),
      defaultVisible: this.defaultVisible() || undefined,
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      invalid: this.invalid() || undefined,
      required: this.required() || undefined,
      name: this.name(),
      autoComplete: this.autoComplete(),
      ignorePasswordManagers: this.ignorePasswordManagers() || undefined,
      translations: this.translations(),
      onVisibilityChange: (details: PasswordInputVisibilityChangeDetails) => {
        if (this.visible() !== details.visible) {
          this.visible.set(details.visible)
        }
      },
    }),
  })

  readonly state: Signal<passwordInput.Service['state']> = this.machine.state
  readonly api: Signal<passwordInput.Api> = this.machine.api
  readonly service: passwordInput.Service = this.machine.service
  readonly send: passwordInput.Service['send'] = this.machine.send

  constructor() {
    let firstRun = true
    effect(() => {
      void this.value()
      if (firstRun) {
        firstRun = false
        this._pendingInternalWrites = 0
        return
      }
      if (this._pendingInternalWrites > 0) {
        this._pendingInternalWrites--
        return
      }
      this._hasExternalBinding = true
    })

    const defaultValue = this.defaultValue()
    if (this.value() === undefined && defaultValue !== undefined) {
      this._pendingInternalWrites++
      this.value.set(defaultValue)
    }

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  setValue(next: string): void {
    if (this.value() !== next) {
      this._pendingInternalWrites++
      this.value.set(next)
    }
    this.cva.notifyValueChange(next)
  }

  writeValue(value: string | null): void {
    const next = value === null ? undefined : value
    const current = this.value()
    if (current !== undefined && current !== this._lastFormValue) {
      this._hasExternalBinding = true
    }
    if (current !== next) {
      this._pendingInternalWrites++
    }
    this._lastFormValue = next
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }

  markTouched(): void {
    this.cva.markTouched()
  }
}
