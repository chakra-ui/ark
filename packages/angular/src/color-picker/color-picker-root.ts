import type * as colorPicker from '@zag-js/color-picker'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  effect,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type ProviderToken,
  type Signal,
} from '@angular/core'
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier, createArkCvaController, type ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  ColorPickerElementIds,
  ColorPickerFocusOutsideEvent,
  ColorPickerFormat,
  ColorPickerInteractOutsideEvent,
  ColorPickerPointerDownOutsideEvent,
  ColorPickerPositioningOptions,
  ColorPickerValue,
  ColorPickerValueChangeDetails,
} from './color-picker.types'
import { ARK_COLOR_PICKER_CONTEXT, ARK_COLOR_PICKER_CONTEXT_CARRIER } from './use-color-picker-context'
import { useColorPicker, type UseColorPickerReturn } from './use-color-picker'

@Directive({
  selector: '[arkColorPicker]',
  standalone: true,
  exportAs: 'arkColorPicker',
  providers: [
    { provide: ARK_COLOR_PICKER_CONTEXT, useExisting: forwardRef(() => ArkColorPickerRoot) },
    {
      provide: ARK_COLOR_PICKER_CONTEXT_CARRIER,
      useFactory: (root: ArkColorPickerRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkColorPickerRoot)],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArkColorPickerRoot),
      multi: true,
    },
  ],
})
export class ArkColorPickerRoot implements UseColorPickerReturn, ControlValueAccessor {
  /** The unique identifier of the color picker. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the color picker elements. Useful for composition. */
  readonly ids: InputSignal<Partial<ColorPickerElementIds> | undefined> = input<
    Partial<ColorPickerElementIds> | undefined
  >(undefined)
  /** The controlled color value. */
  readonly value: ModelSignal<ColorPickerValue | undefined> = model<ColorPickerValue | undefined>(undefined)
  /** The initial color value when uncontrolled. */
  readonly defaultValue: InputSignal<ColorPickerValue | undefined> = input<ColorPickerValue | undefined>(undefined)
  /** The controlled color format. */
  readonly format: ModelSignal<ColorPickerFormat | undefined> = model<ColorPickerFormat | undefined>(undefined)
  /** The initial color format when uncontrolled. */
  readonly defaultFormat: InputSignal<ColorPickerFormat | undefined> = input<ColorPickerFormat | undefined>(undefined)
  /** The controlled open state. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the color picker is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the color picker is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the color picker is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the color picker is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to render the color picker inline. */
  readonly inline: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to close the color picker when a swatch is selected. */
  readonly closeOnSelect: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to auto focus the color picker when it opens. */
  readonly openAutoFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** The name of the hidden input used for form submission. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The positioning options for floating content. */
  readonly positioning: InputSignal<ColorPickerPositioningOptions | undefined> = input<
    ColorPickerPositioningOptions | undefined
  >(undefined)
  /** Element to receive focus when the color picker opens. */
  readonly initialFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)

  /** Emits when the user finishes changing the color value. */
  readonly valueChangeEnd: OutputEmitterRef<ColorPickerValueChangeDetails> = output<ColorPickerValueChangeDetails>()
  /** Emits when focus moves outside the color picker. */
  readonly focusOutside: OutputEmitterRef<ColorPickerFocusOutsideEvent> = output<ColorPickerFocusOutsideEvent>()
  /** Emits when pointer down occurs outside the color picker. */
  readonly pointerDownOutside: OutputEmitterRef<ColorPickerPointerDownOutsideEvent> =
    output<ColorPickerPointerDownOutsideEvent>()
  /** Emits when interaction occurs outside the color picker. */
  readonly interactOutside: OutputEmitterRef<ColorPickerInteractOutsideEvent> =
    output<ColorPickerInteractOutsideEvent>()

  private readonly formDisabled = signal(false)
  private pendingInternalWrites = 0
  private hasExternalBinding = false
  private hasReceivedFormWrite = false
  private readonly cva = createArkCvaController<ColorPickerValue>({
    value: this.value,
    setDisabled: (disabled) => this.formDisabled.set(disabled),
    componentName: 'ArkColorPickerRoot',
    hasExternalModelBinding: () => this.hasExternalBinding,
  })

  private readonly machine = useColorPicker({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      format: this.format(),
      defaultFormat: this.defaultFormat(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      disabled: this.disabled() || this.formDisabled(),
      readOnly: this.readOnly(),
      required: this.required(),
      invalid: this.invalid(),
      inline: this.inline(),
      closeOnSelect: this.closeOnSelect(),
      openAutoFocus: this.openAutoFocus(),
      name: this.name(),
      positioning: this.positioning(),
      initialFocusEl: this.initialFocusEl(),
      onValueChange: (details) => this.syncValue(details),
      onValueChangeEnd: (details) => this.valueChangeEnd.emit(details),
      onFormatChange: (details) => {
        if (this.format() === details.format) return
        this.format.set(details.format)
      },
      onOpenChange: (details) => {
        if (this.open() !== details.open) this.open.set(details.open)
        if (!details.open) this.cva.markTouched()
      },
      onFocusOutside: (event) => this.focusOutside.emit(event),
      onPointerDownOutside: (event) => this.pointerDownOutside.emit(event),
      onInteractOutside: (event) => this.interactOutside.emit(event),
    }),
  })

  readonly state: Signal<colorPicker.Service['state']> = this.machine.state
  readonly api: Signal<colorPicker.Api> = this.machine.api
  readonly service: colorPicker.Service = this.machine.service
  readonly send: colorPicker.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkColorPickerRoot> = buildRootCarrier<ArkColorPickerRoot>({
    root: this,
    rootToken: ARK_COLOR_PICKER_CONTEXT as ProviderToken<ArkColorPickerRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  constructor() {
    let firstRun = true
    effect(() => {
      void this.value()
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

  writeValue(value: ColorPickerValue | null): void {
    const next = value === null ? undefined : value
    const current = this.value()
    if (!this.hasReceivedFormWrite && current !== undefined) {
      this.hasExternalBinding = true
    }
    this.hasReceivedFormWrite = true
    if (!colorsEqual(current, next)) {
      this.pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: ColorPickerValue | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }

  /** @internal Exposed for color picker part directives to consume via ARK_COLOR_PICKER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkColorPickerRoot> {
    return this.arkContextCarrier
  }

  private syncValue(details: ColorPickerValueChangeDetails): void {
    if (colorsEqual(this.value(), details.value)) return
    this.pendingInternalWrites++
    this.value.set(details.value)
    this.cva.notifyValueChange(details.value)
    this.cva.markTouched()
  }
}

function colorsEqual(a: ColorPickerValue | undefined, b: ColorPickerValue | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  return a.toString('css') === b.toString('css')
}
