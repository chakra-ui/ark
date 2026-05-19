import { type CollectionItem, ListCollection, type SelectionMode } from '@zag-js/collection'
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
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  ListboxElementIds,
  ListboxHighlightChangeDetails,
  ListboxScrollToIndexDetails,
  ListboxSelectionDetails,
  ListboxService,
  ListboxValueChangeDetails,
} from './listbox.types'
import { ARK_LISTBOX_CONTEXT } from './use-listbox-context'
import { useListbox, type UseListboxApi, type UseListboxReturn } from './use-listbox'

@Directive({
  selector: '[arkListboxRoot]',
  standalone: true,
  exportAs: 'arkListboxRoot',
  providers: [{ provide: ARK_LISTBOX_CONTEXT, useExisting: forwardRef(() => ArkListboxRoot) }],
})
export class ArkListboxRoot<T extends CollectionItem = CollectionItem> implements UseListboxReturn<T> {
  /** The unique identifier of the listbox. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the listbox parts. */
  readonly elementIds: InputSignal<ListboxElementIds | undefined> = input<ListboxElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The item collection. */
  readonly collection: InputSignal<ListCollection<T>> = input.required<ListCollection<T>>()
  /** The controlled value of the listbox (array of selected keys). */
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial value of the listbox when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled highlighted value of the listbox. */
  readonly highlightedValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial highlighted value when uncontrolled. */
  readonly defaultHighlightedValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** Whether the listbox is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to loop keyboard navigation through the items. */
  readonly loopFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to disallow selecting all items via meta+a. */
  readonly disallowSelectAll: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to disallow empty selection. */
  readonly deselectable: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to select the item when it is highlighted. */
  readonly selectOnHighlight: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether to enable typeahead on the listbox. */
  readonly typeahead: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )
  /** The orientation of the listbox. */
  readonly orientation: InputSignal<'horizontal' | 'vertical' | undefined> = input<
    'horizontal' | 'vertical' | undefined
  >(undefined)
  /** How multiple selection should behave. */
  readonly selectionMode: InputSignal<SelectionMode | undefined> = input<SelectionMode | undefined>(undefined)
  /** Function to scroll to a specific index. */
  readonly scrollToIndexFn: InputSignal<((details: ListboxScrollToIndexDetails) => void) | undefined> = input<
    ((details: ListboxScrollToIndexDetails) => void) | undefined
  >(undefined)

  /** Emits when the selected value changes. */
  readonly valueChange: OutputEmitterRef<ListboxValueChangeDetails<T>> = output<ListboxValueChangeDetails<T>>()
  /** Emits when the highlighted value changes. */
  readonly highlightChange: OutputEmitterRef<ListboxHighlightChangeDetails<T>> =
    output<ListboxHighlightChangeDetails<T>>()
  /** Emits when an item is selected. */
  readonly select: OutputEmitterRef<ListboxSelectionDetails> = output<ListboxSelectionDetails>()

  private _pendingValueWrites = 0
  private _pendingHighlightWrites = 0
  private readonly _fallbackCollection = new ListCollection<T>({ items: [] })

  private readCollection(): ListCollection<T> {
    try {
      return this.collection()
    } catch {
      return this._fallbackCollection
    }
  }

  private readonly machine = useListbox<T>({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      collection: this.readCollection(),
      value: this.value(),
      defaultValue: this.defaultValue() ?? [],
      highlightedValue: this.highlightedValue() ?? undefined,
      defaultHighlightedValue: this.defaultHighlightedValue() ?? undefined,
      disabled: this.disabled() || undefined,
      loopFocus: this.loopFocus() || undefined,
      disallowSelectAll: this.disallowSelectAll() || undefined,
      deselectable: this.deselectable() || undefined,
      selectOnHighlight: this.selectOnHighlight() || undefined,
      typeahead: this.typeahead(),
      orientation: this.orientation(),
      selectionMode: this.selectionMode(),
      scrollToIndexFn: this.scrollToIndexFn(),
      onValueChange: (details: ListboxValueChangeDetails<T>) => {
        const current = this.value()
        if (!arraysShallowEqual(current, details.value)) {
          this._pendingValueWrites++
          this.value.set([...details.value])
        }
        this.valueChange.emit(details)
      },
      onHighlightChange: (details: ListboxHighlightChangeDetails<T>) => {
        const next = details.highlightedValue
        if (this.highlightedValue() !== next) {
          this._pendingHighlightWrites++
          this.highlightedValue.set(next)
        }
        this.highlightChange.emit(details)
      },
      onSelect: (details: ListboxSelectionDetails) => {
        this.select.emit(details)
      },
    }),
  })

  readonly state: Signal<ListboxService<T>['state']> = this.machine.state
  readonly api: Signal<UseListboxApi<T>> = this.machine.api
  readonly service: ListboxService<T> = this.machine.service
  readonly send: ListboxService<T>['send'] = this.machine.send

  constructor() {
    let firstRunValue = true
    effect(() => {
      void this.value()
      if (firstRunValue) {
        firstRunValue = false
        return
      }
      if (this._pendingValueWrites > 0) {
        this._pendingValueWrites--
      }
    })

    let firstRunHighlight = true
    effect(() => {
      void this.highlightedValue()
      if (firstRunHighlight) {
        firstRunHighlight = false
        return
      }
      if (this._pendingHighlightWrites > 0) {
        this._pendingHighlightWrites--
      }
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
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
