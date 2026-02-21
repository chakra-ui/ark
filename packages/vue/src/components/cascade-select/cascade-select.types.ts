import type * as cascadeSelect from '@zag-js/cascade-select'
import type { TreeCollection, TreeNode as CascadeSelectNode } from '../collection'

export interface RootProps<T extends CascadeSelectNode> extends Omit<
  cascadeSelect.Props<T>,
  'dir' | 'getRootNode' | 'id' | 'collection'
> {
  collection: TreeCollection<T>
  id?: string
  modelValue?: string[][]
}

export type RootEmits = {
  exitComplete: []
  highlightChange: [details: cascadeSelect.HighlightChangeDetails]
  openChange: [details: cascadeSelect.OpenChangeDetails]
  valueChange: [details: cascadeSelect.ValueChangeDetails]
  'update:modelValue': [value: string[][]]
  'update:open': [open: boolean]
}
