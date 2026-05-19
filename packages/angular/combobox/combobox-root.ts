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
  ComboboxElementIds,
  ComboboxHighlightChangeDetails,
  ComboboxInputValueChangeDetails,
  ComboboxIntlTranslations,
  ComboboxOpenChangeDetails,
  ComboboxPositioningOptions,
  ComboboxScrollToIndexDetails,
  ComboboxSelectionDetails,
  ComboboxService,
  ComboboxValueChangeDetails,
} from './combobox.types'
import { ARK_COMBOBOX_CONTEXT, ARK_COMBOBOX_CONTEXT_CARRIER } from './use-combobox-context'
import { useCombobox, type UseComboboxApi, type UseComboboxReturn } from './use-combobox'

@Directive({
  selector: '[arkComboboxRoot]',
  standalone: true,
  exportAs: 'arkComboboxRoot',
  providers: [
    { provide: ARK_COMBOBOX_CONTEXT, useExisting: forwardRef(() => ArkComboboxRoot) },
    {
      provide: ARK_COMBOBOX_CONTEXT_CARRIER,
      useFactory: (root: ArkComboboxRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkComboboxRoot)],
    },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkComboboxRoot), multi: true },
  ],
})
export class ArkComboboxRoot<T extends CollectionItem = CollectionItem>
  implements ControlValueAccessor, UseComboboxReturn<T>
{
  /** The unique identifier of the combobox. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the combobox parts. */
  readonly elementIds: InputSignal<ComboboxElementIds | undefined> = input<ComboboxElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The item collection. */
  readonly collection: InputSignal<ListCollection<T>> = input.required<ListCollection<T>>()
  /** The controlled value of the combobox (array of selected keys). */
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial value of the combobox when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled input value of the combobox. */
  readonly inputValue: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial input value of the combobox when uncontrolled. */
  readonly defaultInputValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The controlled open state of the combobox menu. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the combobox when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled highlighted value of the combobox. */
  readonly highlightedValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial highlighted value when uncontrolled. */
  readonly defaultHighlightedValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** Whether the combobox is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the combobox is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the combobox is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the combobox is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether multiple values can be selected. */
  readonly multiple: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to allow typing custom values. */
  readonly allowCustomValue: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the popup auto-focuses on mount. */
  readonly autoFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to open the popup on input click. */
  readonly openOnClick: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to open the popup on arrow key press. */
  readonly openOnKeyPress: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** Whether to always submit on Enter even when popup is open. */
  readonly alwaysSubmitOnEnter: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether the combobox should close after an item is selected. */
  readonly closeOnSelect: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** Whether to loop keyboard navigation through the items. */
  readonly loopFocus: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** Whether the combobox is composed with other composite widgets. */
  readonly composite: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** Whether to disable registering this as a dismissable layer. */
  readonly disableLayer: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    {
      transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)),
    },
  )
  /** Auto-completion behavior. */
  readonly inputBehavior: InputSignal<'autohighlight' | 'autocomplete' | 'none' | undefined> = input<
    'autohighlight' | 'autocomplete' | 'none' | undefined
  >(undefined)
  /** Behavior when an item is selected. */
  readonly selectionBehavior: InputSignal<'clear' | 'replace' | 'preserve' | undefined> = input<
    'clear' | 'replace' | 'preserve' | undefined
  >(undefined)
  /** Whether to open the combobox on input change. */
  readonly openOnChange: InputSignal<boolean | ((details: ComboboxInputValueChangeDetails) => boolean) | undefined> =
    input<boolean | ((details: ComboboxInputValueChangeDetails) => boolean) | undefined>(undefined)
  /** The placeholder text. */
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The name attribute of the underlying input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The associated form of the underlying input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The positioning options of the menu. */
  readonly positioning: InputSignal<ComboboxPositioningOptions | undefined> = input<
    ComboboxPositioningOptions | undefined
  >(undefined)
  /** Function to scroll to a specific index. */
  readonly scrollToIndexFn: InputSignal<((details: ComboboxScrollToIndexDetails) => void) | undefined> = input<
    ((details: ComboboxScrollToIndexDetails) => void) | undefined
  >(undefined)
  /** Function to navigate to the selected item. */
  readonly navigate: InputSignal<
    ((details: import('./combobox.types').ComboboxNavigateDetails) => void) | null | undefined
  > = input<((details: import('./combobox.types').ComboboxNavigateDetails) => void) | null | undefined>(undefined)
  /** Localized strings for accessibility. */
  readonly translations: InputSignal<ComboboxIntlTranslations | undefined> = input<
    ComboboxIntlTranslations | undefined
  >(undefined)

  /** Emits when the selected value changes. */
  readonly valueChange: OutputEmitterRef<ComboboxValueChangeDetails<T>> = output<ComboboxValueChangeDetails<T>>()
  /** Emits when the input value changes. */
  readonly inputValueChange: OutputEmitterRef<ComboboxInputValueChangeDetails> =
    output<ComboboxInputValueChangeDetails>()
  /** Emits when the highlighted value changes. */
  readonly highlightChange: OutputEmitterRef<ComboboxHighlightChangeDetails<T>> =
    output<ComboboxHighlightChangeDetails<T>>()
  /** Emits when the open state changes. */
  readonly openChange: OutputEmitterRef<ComboboxOpenChangeDetails> = output<ComboboxOpenChangeDetails>()
  /** Emits when an item is selected. */
  readonly select: OutputEmitterRef<ComboboxSelectionDetails> = output<ComboboxSelectionDetails>()

  private readonly _disabledFromForm = signal(false)
  private readonly _fallbackCollection = new ListCollection<T>({ items: [] })
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _lastFormValue: string[] | undefined = undefined

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
    componentName: 'ArkComboboxRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useCombobox<T>({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      collection: this.readCollection(),
      value: this.value(),
      defaultValue: this.defaultValue() ?? [],
      inputValue: this.inputValue(),
      defaultInputValue: this.defaultInputValue() ?? '',
      open: this.open(),
      defaultOpen: this.defaultOpen() || undefined,
      highlightedValue: this.highlightedValue() ?? undefined,
      defaultHighlightedValue: this.defaultHighlightedValue() ?? undefined,
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      invalid: this.invalid() || undefined,
      readOnly: this.readOnly() || undefined,
      required: this.required() || undefined,
      multiple: this.multiple() || undefined,
      allowCustomValue: this.allowCustomValue() || undefined,
      autoFocus: this.autoFocus() || undefined,
      openOnClick: this.openOnClick() || undefined,
      openOnKeyPress: this.openOnKeyPress(),
      alwaysSubmitOnEnter: this.alwaysSubmitOnEnter() || undefined,
      closeOnSelect: this.closeOnSelect(),
      loopFocus: this.loopFocus(),
      composite: this.composite(),
      disableLayer: this.disableLayer(),
      inputBehavior: this.inputBehavior(),
      selectionBehavior: this.selectionBehavior(),
      openOnChange: this.openOnChange(),
      placeholder: this.placeholder(),
      name: this.name(),
      form: this.form(),
      positioning: this.positioning(),
      scrollToIndexFn: this.scrollToIndexFn(),
      navigate: this.navigate(),
      translations: this.translations(),
      onValueChange: (details: ComboboxValueChangeDetails<T>) => {
        const current = this.value()
        if (!arraysShallowEqual(current, details.value)) {
          this._pendingInternalWrites++
          this.value.set([...details.value])
        }
        this.cva.notifyValueChange(details.value)
        this.valueChange.emit(details)
      },
      onInputValueChange: (details: ComboboxInputValueChangeDetails) => {
        if (this.inputValue() !== details.inputValue) {
          this.inputValue.set(details.inputValue)
        }
        this.inputValueChange.emit(details)
      },
      onHighlightChange: (details: ComboboxHighlightChangeDetails<T>) => {
        const next = details.highlightedValue
        if (this.highlightedValue() !== next) {
          this.highlightedValue.set(next)
        }
        this.highlightChange.emit(details)
      },
      onOpenChange: (details: ComboboxOpenChangeDetails) => {
        if (this.open() !== details.open) {
          this.open.set(details.open)
        }
        this.openChange.emit(details)
      },
      onSelect: (details: ComboboxSelectionDetails) => {
        this.select.emit(details)
      },
    }),
  })

  readonly state: Signal<ComboboxService<T>['state']> = this.machine.state
  readonly api: Signal<UseComboboxApi<T>> = this.machine.api
  readonly service: ComboboxService<T> = this.machine.service
  readonly send: ComboboxService<T>['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkComboboxRoot<T>> = buildRootCarrier<ArkComboboxRoot<T>>({
    root: this,
    rootToken: ARK_COMBOBOX_CONTEXT as ProviderToken<ArkComboboxRoot<T>>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for combobox part directives to consume via ARK_COMBOBOX_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkComboboxRoot<T>> {
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
    const current = this.value()
    if (current !== undefined && !arraysShallowEqual(current, this._lastFormValue)) {
      this._hasExternalBinding = true
    }
    if (!arraysShallowEqual(current, next)) {
      this._pendingInternalWrites++
    }
    this._lastFormValue = next
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
