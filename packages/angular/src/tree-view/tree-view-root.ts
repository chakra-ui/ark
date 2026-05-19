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
import { TreeCollection, type TreeNode } from '@ark-ui/angular/collection'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  TreeViewCheckedChangeDetails,
  TreeViewElementIds,
  TreeViewExpandedChangeDetails,
  TreeViewFocusChangeDetails,
  TreeViewIntlTranslations,
  TreeViewLoadChildrenCompleteDetails,
  TreeViewLoadChildrenDetails,
  TreeViewLoadChildrenErrorDetails,
  TreeViewRenameCompleteDetails,
  TreeViewRenameStartDetails,
  TreeViewScrollToIndexDetails,
  TreeViewSelectionChangeDetails,
} from './tree-view.types'
import { ARK_TREE_VIEW_CONTEXT } from './use-tree-view-context'
import { useTreeView, type UseTreeViewApi, type UseTreeViewReturn } from './use-tree-view'

const optionalBooleanAttribute = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value)

@Directive({
  selector: '[arkTreeView]',
  standalone: true,
  exportAs: 'arkTreeView',
  providers: [{ provide: ARK_TREE_VIEW_CONTEXT, useExisting: forwardRef(() => ArkTreeViewRoot) }],
})
export class ArkTreeViewRoot<T extends TreeNode = TreeNode> implements UseTreeViewReturn<T> {
  /** The unique identifier of the tree view. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the tree view elements. Useful for composition. */
  readonly ids: InputSignal<Partial<TreeViewElementIds> | undefined> = input<Partial<TreeViewElementIds> | undefined>(
    undefined,
  )
  /** The collection of tree nodes. */
  readonly collection: InputSignal<TreeCollection<T>> = input.required<TreeCollection<T>>()
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
  /** Whether the tree supports typeahead search. */
  readonly typeahead: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** How selection should behave. */
  readonly selectionMode: InputSignal<'single' | 'multiple' | undefined> = input<'single' | 'multiple' | undefined>(
    undefined,
  )
  /** The localized strings for the tree view. */
  readonly translations: InputSignal<TreeViewIntlTranslations | undefined> = input<
    TreeViewIntlTranslations | undefined
  >(undefined)
  /** Function to load children for a node asynchronously. */
  readonly loadChildren: InputSignal<((details: TreeViewLoadChildrenDetails<T>) => Promise<T[]>) | undefined> = input<
    ((details: TreeViewLoadChildrenDetails<T>) => Promise<T[]>) | undefined
  >(undefined)
  /** Function to determine if a node can be renamed. */
  readonly canRename: InputSignal<((node: T, indexPath: number[]) => boolean) | undefined> = input<
    ((node: T, indexPath: number[]) => boolean) | undefined
  >(undefined)
  /** Function to scroll to a specific visible node index. */
  readonly scrollToIndexFn: InputSignal<((details: TreeViewScrollToIndexDetails<T>) => void) | undefined> = input<
    ((details: TreeViewScrollToIndexDetails<T>) => void) | undefined
  >(undefined)

  /** Emits when expanded nodes change. */
  readonly expandedChange: OutputEmitterRef<TreeViewExpandedChangeDetails<T>> =
    output<TreeViewExpandedChangeDetails<T>>()
  /** Emits when selection changes. */
  readonly selectionChange: OutputEmitterRef<TreeViewSelectionChangeDetails<T>> =
    output<TreeViewSelectionChangeDetails<T>>()
  /** Emits when checked nodes change. */
  readonly checkedChange: OutputEmitterRef<TreeViewCheckedChangeDetails> = output<TreeViewCheckedChangeDetails>()
  /** Emits when focus changes. */
  readonly focusChange: OutputEmitterRef<TreeViewFocusChangeDetails<T>> = output<TreeViewFocusChangeDetails<T>>()
  /** Emits when async children load successfully. */
  readonly loadChildrenComplete: OutputEmitterRef<TreeViewLoadChildrenCompleteDetails<T>> =
    output<TreeViewLoadChildrenCompleteDetails<T>>()
  /** Emits when async children fail to load. */
  readonly loadChildrenError: OutputEmitterRef<TreeViewLoadChildrenErrorDetails<T>> =
    output<TreeViewLoadChildrenErrorDetails<T>>()
  /** Emits when node rename starts. */
  readonly renameStart: OutputEmitterRef<TreeViewRenameStartDetails<T>> = output<TreeViewRenameStartDetails<T>>()
  /** Emits before node rename completes. */
  readonly beforeRename: OutputEmitterRef<TreeViewRenameCompleteDetails> = output<TreeViewRenameCompleteDetails>()
  /** Emits when node rename completes. */
  readonly renameComplete: OutputEmitterRef<TreeViewRenameCompleteDetails> = output<TreeViewRenameCompleteDetails>()

  private readonly fallbackCollection = new TreeCollection<T>({
    rootNode: { value: 'ROOT' } as T,
    nodeToValue: (node) => String((node as { value?: string }).value ?? ''),
    nodeToString: (node) =>
      String((node as { label?: string; value?: string }).label ?? (node as { value?: string }).value ?? ''),
    nodeToChildren: (node) => ((node as { children?: T[] }).children ?? []) as T[],
  })

  private readCollection(): TreeCollection<T> {
    try {
      return this.collection()
    } catch {
      return this.fallbackCollection
    }
  }

  private readonly machine = useTreeView<T>({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      collection: this.readCollection(),
      expandedValue: this.expandedValue(),
      defaultExpandedValue: this.defaultExpandedValue(),
      selectedValue: this.selectedValue(),
      defaultSelectedValue: this.defaultSelectedValue(),
      checkedValue: this.checkedValue(),
      defaultCheckedValue: this.defaultCheckedValue(),
      focusedValue: this.focusedValue(),
      defaultFocusedValue: this.defaultFocusedValue(),
      expandOnClick: this.expandOnClick(),
      typeahead: this.typeahead(),
      selectionMode: this.selectionMode(),
      translations: this.translations(),
      loadChildren: this.loadChildren(),
      canRename: this.canRename(),
      scrollToIndexFn: this.scrollToIndexFn(),
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
      onLoadChildrenComplete: (details) => {
        this.loadChildrenComplete.emit(details)
      },
      onLoadChildrenError: (details) => {
        this.loadChildrenError.emit(details)
      },
      onRenameStart: (details) => {
        this.renameStart.emit(details)
      },
      onBeforeRename: (details) => {
        this.beforeRename.emit(details)
        return true
      },
      onRenameComplete: (details) => {
        this.renameComplete.emit(details)
      },
    }),
  })

  readonly state: Signal<treeView.Service<T>['state']> = this.machine.state
  readonly api: Signal<UseTreeViewApi<T>> = this.machine.api
  readonly service: treeView.Service<T> = this.machine.service
  readonly send: treeView.Service<T>['send'] = this.machine.send

  constructor() {
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
  for (let index = 0; index < a.length; index++) {
    if (a[index] !== b[index]) return false
  }
  return true
}
