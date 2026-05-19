import type * as treeView from '@zag-js/tree-view'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
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
import { ARK_TREE_VIEW_CONTEXT, type UseTreeViewApi } from '@ark-ui/angular/tree-view'
import { ARK_JSON_TREE_VIEW_CONTEXT, ARK_JSON_TREE_VIEW_OPTIONS } from './use-json-tree-view-context'
import { useJsonTreeView } from './use-json-tree-view'
import type {
  JsonTreeViewCheckedChangeDetails,
  JsonTreeViewElementIds,
  JsonTreeViewExpandedChangeDetails,
  JsonTreeViewFocusChangeDetails,
  JsonTreeViewOptions,
  JsonTreeViewSelectionChangeDetails,
  UseJsonTreeViewReturn,
} from './json-tree-view.types'
import type { JsonNode } from '@zag-js/json-tree-utils'

const optionalBooleanAttribute = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value)

@Directive({
  selector: '[arkJsonTreeView]',
  standalone: true,
  exportAs: 'arkJsonTreeView',
  providers: [
    { provide: ARK_JSON_TREE_VIEW_CONTEXT, useExisting: forwardRef(() => ArkJsonTreeViewRoot) },
    { provide: ARK_TREE_VIEW_CONTEXT, useExisting: forwardRef(() => ArkJsonTreeViewRoot) },
    {
      provide: ARK_JSON_TREE_VIEW_OPTIONS,
      useFactory: (root: ArkJsonTreeViewRoot) => root.options,
      deps: [forwardRef(() => ArkJsonTreeViewRoot)],
    },
  ],
})
export class ArkJsonTreeViewRoot implements UseJsonTreeViewReturn {
  /** The data to display in the tree. */
  readonly data: InputSignal<unknown> = input.required<unknown>()
  /** The unique identifier of the tree view. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the tree view elements. Useful for composition. */
  readonly ids: InputSignal<Partial<JsonTreeViewElementIds> | undefined> = input<
    Partial<JsonTreeViewElementIds> | undefined
  >(undefined)
  /** The default depth to expand. */
  readonly defaultExpandedDepth: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The controlled expanded node values. */
  readonly expandedValue: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial expanded node values when uncontrolled. */
  readonly defaultExpandedValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled selected node values. */
  readonly selectedValue: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial selected node values when uncontrolled. */
  readonly defaultSelectedValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled checked node values. */
  readonly checkedValue: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial checked node values when uncontrolled. */
  readonly defaultCheckedValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** The controlled focused node value. */
  readonly focusedValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial focused node value when uncontrolled. */
  readonly defaultFocusedValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** Whether clicking on a branch should open it. */
  readonly expandOnClick: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** How selection should behave. */
  readonly selectionMode: InputSignal<'single' | 'multiple' | undefined> = input<'single' | 'multiple' | undefined>(
    undefined,
  )
  /** The maximum number of preview items to render for composite values. */
  readonly maxPreviewItems: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The string length after which string previews are collapsed. */
  readonly collapseStringsAfterLength: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether to show quotes on object keys. */
  readonly quotesOnKeys: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** The array length after which array previews are grouped. */
  readonly groupArraysAfterLength: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether to show non-enumerable properties. */
  readonly showNonenumerable: InputSignalWithTransform<boolean | undefined, unknown> = input<
    boolean | undefined,
    unknown
  >(undefined, { transform: optionalBooleanAttribute })

  /** Emits when expanded nodes change. */
  readonly expandedChange: OutputEmitterRef<JsonTreeViewExpandedChangeDetails> =
    output<JsonTreeViewExpandedChangeDetails>()
  /** Emits when selection changes. */
  readonly selectionChange: OutputEmitterRef<JsonTreeViewSelectionChangeDetails> =
    output<JsonTreeViewSelectionChangeDetails>()
  /** Emits when checked nodes change. */
  readonly checkedChange: OutputEmitterRef<JsonTreeViewCheckedChangeDetails> =
    output<JsonTreeViewCheckedChangeDetails>()
  /** Emits when focus changes. */
  readonly focusChange: OutputEmitterRef<JsonTreeViewFocusChangeDetails> = output<JsonTreeViewFocusChangeDetails>()

  private readonly jsonTreeView = useJsonTreeView({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      data: this.readData(),
      defaultExpandedDepth: this.defaultExpandedDepth(),
      expandedValue: this.expandedValue(),
      defaultExpandedValue: this.defaultExpandedValue(),
      selectedValue: this.selectedValue(),
      defaultSelectedValue: this.defaultSelectedValue(),
      checkedValue: this.checkedValue(),
      defaultCheckedValue: this.defaultCheckedValue(),
      focusedValue: this.focusedValue(),
      defaultFocusedValue: this.defaultFocusedValue(),
      expandOnClick: this.expandOnClick(),
      selectionMode: this.selectionMode(),
      maxPreviewItems: this.maxPreviewItems(),
      collapseStringsAfterLength: this.collapseStringsAfterLength(),
      quotesOnKeys: this.quotesOnKeys(),
      groupArraysAfterLength: this.groupArraysAfterLength(),
      showNonenumerable: this.showNonenumerable(),
      onExpandedChange: (details) => {
        if (!arraysShallowEqual(this.expandedValue(), details.expandedValue)) {
          this.expandedValue.set([...details.expandedValue])
        }
        this.expandedChange.emit(details)
      },
      onSelectionChange: (details) => {
        if (!arraysShallowEqual(this.selectedValue(), details.selectedValue)) {
          this.selectedValue.set([...details.selectedValue])
        }
        this.selectionChange.emit(details)
      },
      onCheckedChange: (details) => {
        if (!arraysShallowEqual(this.checkedValue(), details.checkedValue)) {
          this.checkedValue.set([...details.checkedValue])
        }
        this.checkedChange.emit(details)
      },
      onFocusChange: (details) => {
        if (this.focusedValue() !== details.focusedValue) {
          this.focusedValue.set(details.focusedValue)
        }
        this.focusChange.emit(details)
      },
    }),
  })

  readonly state: Signal<treeView.Service<JsonNode>['state']> = this.jsonTreeView.state
  readonly api: Signal<UseTreeViewApi<JsonNode>> = this.jsonTreeView.api
  readonly service: treeView.Service<JsonNode> = this.jsonTreeView.service
  readonly send: treeView.Service<JsonNode>['send'] = this.jsonTreeView.send
  readonly options: Signal<JsonTreeViewOptions> = this.jsonTreeView.options

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({ ...this.api().getRootProps(), 'data-scope': 'json-tree-view' }),
    })
  }

  private readData(): unknown {
    try {
      return this.data()
    } catch {
      return undefined
    }
  }
}

function arraysShallowEqual(a: string[] | undefined, b: string[] | undefined): boolean {
  if (a === b) return true
  if (!a || !b || a.length !== b.length) return false
  return a.every((value, index) => value === b[index])
}
