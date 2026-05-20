import type * as segmentGroup from '@zag-js/radio-group'
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
import type { SegmentGroupElementIds, SegmentGroupValueChangeDetails } from './segment-group.types'
import { ARK_SEGMENT_GROUP_CONTEXT } from './use-segment-group-context'
import { useSegmentGroup, type UseSegmentGroupReturn } from './use-segment-group'

@Directive({
  selector: '[arkSegmentGroupRoot]',
  standalone: true,
  exportAs: 'arkSegmentGroupRoot',
  providers: [
    { provide: ARK_SEGMENT_GROUP_CONTEXT, useExisting: forwardRef(() => ArkSegmentGroupRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkSegmentGroupRoot), multi: true },
  ],
})
export class ArkSegmentGroupRoot implements ControlValueAccessor, UseSegmentGroupReturn {
  /** The id of the segment group. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the segment group parts. */
  readonly elementIds: InputSignal<SegmentGroupElementIds | undefined> = input<SegmentGroupElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  /** The controlled value of the segment group. */
  readonly value: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial value when the segment group is uncontrolled. */
  readonly defaultValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** The name attribute forwarded to the item hidden inputs. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The form attribute forwarded to the item hidden inputs. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the segment group is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the segment group is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the segment group is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the segment group is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The orientation of the segment group. */
  readonly orientation: InputSignal<'horizontal' | 'vertical' | undefined> = input<
    'horizontal' | 'vertical' | undefined
  >(undefined)

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<string | null>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkSegmentGroupRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useSegmentGroup({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      name: this.name(),
      form: this.form(),
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      invalid: this.invalid() || undefined,
      required: this.required() || undefined,
      readOnly: this.readOnly() || undefined,
      orientation: this.orientation(),
      onValueChange: (details: SegmentGroupValueChangeDetails) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
        this.cva.markTouched()
      },
    }),
  })

  readonly state: Signal<segmentGroup.Service['state']> = this.machine.state
  readonly api: Signal<segmentGroup.Api> = this.machine.api
  readonly service: segmentGroup.Service = this.machine.service
  readonly send: segmentGroup.Service['send'] = this.machine.send

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
    const current = this.value()
    const next = value === null ? undefined : value
    if (!this._hasReceivedFormWrite && current !== undefined) {
      this._hasExternalBinding = true
    }
    this._hasReceivedFormWrite = true
    if (current !== next) {
      this._pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string | null | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
