import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseCheckboxProps } from './use-checkbox.svelte'

const splitFn = createSplitProps<UseCheckboxProps>()

export const splitCheckboxProps = <T extends UseCheckboxProps>(props: T) =>
  splitFn(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])
