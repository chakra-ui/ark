import type * as ratingGroup from '@zag-js/rating-group'
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
  RatingGroupElementIds,
  RatingGroupHoverChangeDetails,
  RatingGroupIntlTranslations,
  RatingGroupValueChangeDetails,
} from './rating-group.types'
import { ARK_RATING_GROUP_CONTEXT } from './use-rating-group-context'
import { useRatingGroup, type UseRatingGroupReturn } from './use-rating-group'

@Directive({
  selector: '[arkRatingGroup]',
  standalone: true,
  exportAs: 'arkRatingGroup',
  providers: [
    { provide: ARK_RATING_GROUP_CONTEXT, useExisting: forwardRef(() => ArkRatingGroupRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkRatingGroupRoot), multi: true },
  ],
})
export class ArkRatingGroupRoot implements ControlValueAccessor, UseRatingGroupReturn {
  /** The id of the rating group. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the rating group parts. */
  readonly elementIds: InputSignal<RatingGroupElementIds | undefined> = input<RatingGroupElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  /** The controlled value of the rating group. */
  readonly value: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The initial value of the rating group when uncontrolled. */
  readonly defaultValue: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    {
      transform: (value: unknown) =>
        value === null || value === undefined || value === '' ? undefined : numberAttribute(value),
    },
  )
  /** The total number of ratings. */
  readonly count: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    {
      transform: (value: unknown) =>
        value === null || value === undefined || value === '' ? undefined : numberAttribute(value),
    },
  )
  /** The name attribute of the hidden input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The associated form of the hidden input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the rating group is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the rating group is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the rating group is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to allow half-star selection. */
  readonly allowHalf: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to auto-focus the rating group. */
  readonly autoFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Localized strings for accessibility. */
  readonly translations: InputSignal<RatingGroupIntlTranslations | undefined> = input<
    RatingGroupIntlTranslations | undefined
  >(undefined)
  /** Emits when the hovered rating value changes. */
  readonly hoverChange: OutputEmitterRef<RatingGroupHoverChangeDetails> = output<RatingGroupHoverChangeDetails>()

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<number>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkRatingGroupRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useRatingGroup({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      count: this.count(),
      name: this.name(),
      form: this.form(),
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      required: this.required() || undefined,
      allowHalf: this.allowHalf() || undefined,
      autoFocus: this.autoFocus() || undefined,
      translations: this.translations(),
      onValueChange: (details: RatingGroupValueChangeDetails) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
        this.cva.markTouched()
      },
      onHoverChange: (details: RatingGroupHoverChangeDetails) => {
        this.hoverChange.emit(details)
      },
    }),
  })

  readonly state: Signal<ratingGroup.Service['state']> = this.machine.state
  readonly api: Signal<ratingGroup.Api> = this.machine.api
  readonly service: ratingGroup.Service = this.machine.service
  readonly send: ratingGroup.Service['send'] = this.machine.send

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

  writeValue(value: number | null): void {
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

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
