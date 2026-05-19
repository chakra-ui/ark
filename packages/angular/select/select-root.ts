import { type CollectionItem, ListCollection } from '@zag-js/collection'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  type ProviderToken,
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
import { buildRootCarrier, type ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { createArkCvaController } from '../src/forms/control-value-accessor'
import type {
  SelectElementIds,
  SelectHighlightChangeDetails,
  SelectIntlTranslations,
  SelectOpenChangeDetails,
  SelectPositioningOptions,
  SelectScrollToIndexDetails,
  SelectSelectionDetails,
  SelectService,
  SelectValueChangeDetails,
} from './select.types'
import { ARK_SELECT_CONTEXT, ARK_SELECT_CONTEXT_CARRIER } from './use-select-context'
import { useSelect, type UseSelectApi, type UseSelectReturn } from './use-select'

@Directive({
  selector: '[arkSelectRoot]',
  standalone: true,
  exportAs: 'arkSelectRoot',
  providers: [
    { provide: ARK_SELECT_CONTEXT, useExisting: forwardRef(() => ArkSelectRoot) },
    {
      provide: ARK_SELECT_CONTEXT_CARRIER,
      useFactory: (root: ArkSelectRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkSelectRoot)],
    },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkSelectRoot), multi: true },
  ],
})
export class ArkSelectRoot<T extends CollectionItem = CollectionItem>
  implements ControlValueAccessor, UseSelectReturn<T>
{
  /** The unique identifier of the select. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the select parts. */
  readonly elementIds: InputSignal<SelectElementIds | undefined> = input<SelectElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The item collection. */
  readonly collection: InputSignal<ListCollection<T>> = input.required<ListCollection<T>>()
  /** The controlled value of the select (array of selected keys). */
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial value of the select when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled open state of the select menu. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the select when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled highlighted value of the select. */
  readonly highlightedValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial highlighted value when uncontrolled. */
  readonly defaultHighlightedValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** Whether the select is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the select is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the select is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the select is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether multiple values can be selected. */
  readonly multiple: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the select should close after an item is selected. */
  readonly closeOnSelect: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** Whether to loop keyboard navigation through the items. */
  readonly loopFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the value can be cleared by clicking the selected item. */
  readonly deselectable: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the select is composed with other composite widgets. */
  readonly composite: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** The name attribute of the underlying hidden select. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The associated form of the underlying hidden select. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The autocomplete attribute for the hidden select. */
  readonly autoComplete: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The positioning options of the menu. */
  readonly positioning: InputSignal<SelectPositioningOptions | undefined> = input<SelectPositioningOptions | undefined>(
    undefined,
  )
  /** Function to scroll to a specific index. */
  readonly scrollToIndexFn: InputSignal<((details: SelectScrollToIndexDetails) => void) | undefined> = input<
    ((details: SelectScrollToIndexDetails) => void) | undefined
  >(undefined)
  /** Localized strings for accessibility. */
  readonly translations: InputSignal<SelectIntlTranslations | undefined> = input<SelectIntlTranslations | undefined>(
    undefined,
  )

  /** Emits when the selected value changes. */
  readonly valueChange: OutputEmitterRef<SelectValueChangeDetails<T>> = output<SelectValueChangeDetails<T>>()
  /** Emits when the highlighted value changes. */
  readonly highlightChange: OutputEmitterRef<SelectHighlightChangeDetails<T>> =
    output<SelectHighlightChangeDetails<T>>()
  /** Emits when the open state changes. */
  readonly openChange: OutputEmitterRef<SelectOpenChangeDetails> = output<SelectOpenChangeDetails>()
  /** Emits when an item is selected. */
  readonly select: OutputEmitterRef<SelectSelectionDetails> = output<SelectSelectionDetails>()

  private readonly _disabledFromForm = signal(false)
  private readonly _fallbackCollection = new ListCollection<T>({ items: [] })
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readCollection(): ListCollection<T> {
    try {
      return this.collection()
    } catch {
      return this._fallbackCollection
    }
  }

  private readonly cva = createArkCvaController<string[]>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkSelectRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useSelect<T>({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      collection: this.readCollection(),
      value: this.value(),
      defaultValue: this.defaultValue() ?? [],
      open: this.open(),
      defaultOpen: this.defaultOpen() || undefined,
      highlightedValue: this.highlightedValue() ?? undefined,
      defaultHighlightedValue: this.defaultHighlightedValue() ?? undefined,
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      invalid: this.invalid() || undefined,
      readOnly: this.readOnly() || undefined,
      required: this.required() || undefined,
      multiple: this.multiple() || undefined,
      closeOnSelect: this.closeOnSelect(),
      loopFocus: this.loopFocus() || undefined,
      deselectable: this.deselectable() || undefined,
      composite: this.composite(),
      name: this.name(),
      form: this.form(),
      autoComplete: this.autoComplete(),
      positioning: this.positioning(),
      scrollToIndexFn: this.scrollToIndexFn(),
      translations: this.translations(),
      onValueChange: (details: SelectValueChangeDetails<T>) => {
        const current = this.value()
        if (!arraysShallowEqual(current, details.value)) {
          this._pendingInternalWrites++
          this.value.set([...details.value])
        }
        this.cva.notifyValueChange(details.value)
        this.valueChange.emit(details)
      },
      onHighlightChange: (details: SelectHighlightChangeDetails<T>) => {
        const next = details.highlightedValue
        if (this.highlightedValue() !== next) {
          this.highlightedValue.set(next)
        }
        this.highlightChange.emit(details)
      },
      onOpenChange: (details: SelectOpenChangeDetails) => {
        if (this.open() !== details.open) {
          this.open.set(details.open)
        }
        this.openChange.emit(details)
      },
      onSelect: (details: SelectSelectionDetails) => {
        this.select.emit(details)
      },
    }),
  })

  readonly state: Signal<SelectService<T>['state']> = this.machine.state
  readonly api: Signal<UseSelectApi<T>> = this.machine.api
  readonly service: SelectService<T> = this.machine.service
  readonly send: SelectService<T>['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkSelectRoot<T>> = buildRootCarrier<ArkSelectRoot<T>>({
    root: this,
    rootToken: ARK_SELECT_CONTEXT as ProviderToken<ArkSelectRoot<T>>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for select part directives to consume via ARK_SELECT_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkSelectRoot<T>> {
    return this.arkContextCarrier
  }

  constructor() {
    let firstRunValue = true
    effect(() => {
      void this.value()
      if (firstRunValue) {
        firstRunValue = false
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
    if (!this._hasReceivedFormWrite && this.value() !== undefined) {
      this._hasExternalBinding = true
    }
    this._hasReceivedFormWrite = true
    if (!arraysShallowEqual(this.value(), next)) {
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
