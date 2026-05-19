import type * as editable from '@zag-js/editable'
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
  output,
  signal,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createArkCvaController } from '@ark-ui/angular/src/internal'
import type {
  EditableEditChangeDetails,
  EditableElementIds,
  EditableFocusOutsideEvent,
  EditableInteractOutsideEvent,
  EditablePointerDownOutsideEvent,
  EditableValueChangeDetails,
} from './editable.types'
import { ARK_EDITABLE_CONTEXT } from './use-editable-context'
import { useEditable, type UseEditableReturn } from './use-editable'

@Directive({
  selector: '[arkEditableRoot]',
  standalone: true,
  exportAs: 'arkEditableRoot',
  providers: [
    { provide: ARK_EDITABLE_CONTEXT, useExisting: forwardRef(() => ArkEditableRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkEditableRoot), multi: true },
  ],
})
export class ArkEditableRoot implements ControlValueAccessor, UseEditableReturn {
  /** The id of the editable. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the editable parts. */
  readonly elementIds: InputSignal<EditableElementIds | undefined> = input<EditableElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The controlled value of the editable. */
  readonly value: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial value of the editable when uncontrolled. */
  readonly defaultValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The controlled edit state of the editable. */
  readonly editing: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial edit state of the editable when uncontrolled. */
  readonly defaultEditing: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the editable is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the editable is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the editable is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the editable is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The placeholder text for the editable. */
  readonly placeholder: InputSignal<string | { edit: string; preview: string } | undefined> = input<
    string | { edit: string; preview: string } | undefined
  >(undefined)
  /** The name attribute of the editable input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The form attribute of the editable input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The maximum number of characters allowed. */
  readonly maxLength: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The activation mode for the preview element. */
  readonly activationMode: InputSignal<editable.ActivationMode | undefined> = input<
    editable.ActivationMode | undefined
  >(undefined)
  /** The action that triggers submit in edit mode. */
  readonly submitMode: InputSignal<editable.SubmitMode | undefined> = input<editable.SubmitMode | undefined>(undefined)
  /** Whether the editable should auto-resize to fit content. */
  readonly autoResize: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to select the text in the input when focused. */
  readonly selectOnFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** The translations for the editable. */
  readonly translations: InputSignal<editable.IntlTranslations | undefined> = input<
    editable.IntlTranslations | undefined
  >(undefined)
  /** The element that should receive focus when edit mode exits. */
  readonly finalFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)

  /** Emits when the edit state changes with Zag details. */
  readonly editChange: OutputEmitterRef<EditableEditChangeDetails> = output<EditableEditChangeDetails>()
  /** Emits when the editable value is committed. */
  readonly valueCommit: OutputEmitterRef<EditableValueChangeDetails> = output<EditableValueChangeDetails>()
  /** Emits when the editable value is reverted. */
  readonly valueRevert: OutputEmitterRef<EditableValueChangeDetails> = output<EditableValueChangeDetails>()
  /** Emits when focus moves outside the editable while editing. */
  readonly focusOutside: OutputEmitterRef<EditableFocusOutsideEvent> = output<EditableFocusOutsideEvent>()
  /** Emits when pointer down happens outside the editable while editing. */
  readonly pointerDownOutside: OutputEmitterRef<EditablePointerDownOutsideEvent> =
    output<EditablePointerDownOutsideEvent>()
  /** Emits when an interaction happens outside the editable while editing. */
  readonly interactOutside: OutputEmitterRef<EditableInteractOutsideEvent> = output<EditableInteractOutsideEvent>()

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<string>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkEditableRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useEditable({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      edit: this.editing(),
      defaultEdit: this.defaultEditing(),
      disabled: this.disabled() || this._disabledFromForm(),
      readOnly: this.readOnly(),
      invalid: this.invalid(),
      required: this.required(),
      placeholder: this.placeholder(),
      name: this.name(),
      form: this.form(),
      maxLength: this.maxLength(),
      activationMode: this.activationMode(),
      submitMode: this.submitMode(),
      autoResize: this.autoResize(),
      selectOnFocus: this.selectOnFocus(),
      translations: this.translations(),
      finalFocusEl: this.finalFocusEl(),
      onValueChange: (details) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
      },
      onValueCommit: (details) => {
        this.valueCommit.emit(details)
        this.cva.markTouched()
      },
      onValueRevert: (details) => {
        this.valueRevert.emit(details)
      },
      onEditChange: (details) => {
        this.editing.set(details.edit)
        this.editChange.emit(details)
        if (!details.edit) {
          this.cva.markTouched()
        }
      },
      onFocusOutside: (event) => this.focusOutside.emit(event),
      onPointerDownOutside: (event) => this.pointerDownOutside.emit(event),
      onInteractOutside: (event) => this.interactOutside.emit(event),
    }),
  })

  readonly state: Signal<editable.Service['state']> = this.machine.state
  readonly api: Signal<editable.Api> = this.machine.api
  readonly service: editable.Service = this.machine.service
  readonly send: editable.Service['send'] = this.machine.send

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

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  writeValue(value: string | null): void {
    const next = value === null ? undefined : value
    const current = this.value()
    if (!this._hasReceivedFormWrite && current !== undefined) {
      this._hasExternalBinding = true
    }
    this._hasReceivedFormWrite = true
    if (current !== next) {
      this._pendingInternalWrites++
    }
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
}
