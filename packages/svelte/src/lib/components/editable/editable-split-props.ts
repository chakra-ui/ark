import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseEditableProps } from './use-editable.svelte'

const splitFn = createSplitProps<UseEditableProps>()
export function splitEditableProps<T extends UseEditableProps>(props: T) {
  return splitFn(props, [
    'activationMode',
    'autoResize',
    'defaultEdit',
    'defaultValue',
    'disabled',
    'edit',
    'finalFocusEl',
    'form',
    'id',
    'ids',
    'invalid',
    'maxLength',
    'name',
    'onEditChange',
    'onFocusOutside',
    'onInteractOutside',
    'onPointerDownOutside',
    'onValueChange',
    'onValueCommit',
    'onValueRevert',
    'placeholder',
    'readOnly',
    'required',
    'selectOnFocus',
    'submitMode',
    'translations',
    'value',
  ])
}
