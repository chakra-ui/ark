import type * as tagsInput from '@zag-js/tags-input'
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
  numberAttribute,
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
  TagsInputElementIds,
  TagsInputHighlightChangeDetails,
  TagsInputInputValueChangeDetails,
  TagsInputIntlTranslations,
  TagsInputValidateArgs,
  TagsInputValidityChangeDetails,
  TagsInputValueChangeDetails,
} from './tags-input.types'
import { ARK_TAGS_INPUT_CONTEXT } from './use-tags-input-context'
import { useTagsInput, type UseTagsInputReturn } from './use-tags-input'

@Directive({
  selector: '[arkTagsInputRoot]',
  standalone: true,
  exportAs: 'arkTagsInputRoot',
  providers: [
    { provide: ARK_TAGS_INPUT_CONTEXT, useExisting: forwardRef(() => ArkTagsInputRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkTagsInputRoot), multi: true },
  ],
})
export class ArkTagsInputRoot implements ControlValueAccessor, UseTagsInputReturn {
  /** The id of the tags input. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the tags input parts. */
  readonly elementIds: InputSignal<TagsInputElementIds | undefined> = input<TagsInputElementIds | undefined>(
    undefined,
    {
      alias: 'ids',
    },
  )
  /** The controlled value of the tags input as an array of tag strings. */
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial value of the tags input when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled value of the entry input. */
  readonly inputValue: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial entry input value when uncontrolled. */
  readonly defaultInputValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the tags input is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the tags input is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the tags input is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the tags input is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether tags are editable after creation. */
  readonly editable: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to auto-focus the entry input. */
  readonly autoFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to allow duplicate tags. */
  readonly allowDuplicates: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to allow tags to exceed max. */
  readonly allowOverflow: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to add a tag when pasting into the input. */
  readonly addOnPaste: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Max number of tags. */
  readonly max: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === null || value === undefined || value === '' ? undefined : numberAttribute(value),
  })
  /** Max length of the entry input. */
  readonly maxLength: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    {
      transform: (value: unknown) =>
        value === null || value === undefined || value === '' ? undefined : numberAttribute(value),
    },
  )
  /** The delimiter character or regex used to add tags. */
  readonly delimiter: InputSignal<string | RegExp | undefined> = input<string | RegExp | undefined>(undefined)
  /** The blur behavior of the entry input. */
  readonly blurBehavior: InputSignal<'clear' | 'add' | undefined> = input<'clear' | 'add' | undefined>(undefined)
  /** The placeholder text for the entry input. */
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The name attribute of the hidden input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The form attribute of the hidden input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Function used to sanitize a tag value before adding. */
  readonly sanitizeValue: InputSignal<((value: string) => string) | undefined> = input<
    ((value: string) => string) | undefined
  >(undefined)
  /** Predicate used to determine whether a tag can be added. */
  readonly validate: InputSignal<((details: TagsInputValidateArgs) => boolean) | undefined> = input<
    ((details: TagsInputValidateArgs) => boolean) | undefined
  >(undefined)
  /** The translations for the tags input. */
  readonly translations: InputSignal<TagsInputIntlTranslations | undefined> = input<
    TagsInputIntlTranslations | undefined
  >(undefined)

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<string[]>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkTagsInputRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useTagsInput({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      inputValue: this.inputValue(),
      defaultInputValue: this.defaultInputValue(),
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      invalid: this.invalid() || undefined,
      required: this.required() || undefined,
      editable: this.editable(),
      autoFocus: this.autoFocus() || undefined,
      allowDuplicates: this.allowDuplicates() || undefined,
      allowOverflow: this.allowOverflow() || undefined,
      addOnPaste: this.addOnPaste() || undefined,
      max: this.max(),
      maxLength: this.maxLength(),
      delimiter: this.delimiter(),
      blurBehavior: this.blurBehavior(),
      placeholder: this.placeholder(),
      name: this.name(),
      form: this.form(),
      sanitizeValue: this.sanitizeValue(),
      validate: this.validate(),
      translations: this.translations(),
      onValueChange: (details: TagsInputValueChangeDetails) => {
        const current = this.value()
        if (!arraysShallowEqual(current, details.value)) {
          this._pendingInternalWrites++
          this.value.set([...details.value])
        }
        this.cva.notifyValueChange(details.value)
        this.cva.markTouched()
      },
      onInputValueChange: (details: TagsInputInputValueChangeDetails) => {
        if (this.inputValue() !== details.inputValue) {
          this.inputValue.set(details.inputValue)
        }
      },
      onHighlightChange: (_details: TagsInputHighlightChangeDetails) => {
        // no-op; consumers can listen via root-provider api if needed
      },
      onValueInvalid: (_details: TagsInputValidityChangeDetails) => {
        // no-op
      },
    }),
  })

  readonly state: Signal<tagsInput.Service['state']> = this.machine.state
  readonly api: Signal<tagsInput.Api> = this.machine.api
  readonly service: tagsInput.Service = this.machine.service
  readonly send: tagsInput.Service['send'] = this.machine.send

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

  writeValue(value: string[] | null): void {
    const next = value === null ? undefined : value
    const current = this.value()
    if (!this._hasReceivedFormWrite && current !== undefined) {
      this._hasExternalBinding = true
    }
    this._hasReceivedFormWrite = true
    if (!arraysShallowEqual(current, next)) {
      this._pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string[] | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}

function arraysShallowEqual(a: string[] | undefined, b: string[] | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}
