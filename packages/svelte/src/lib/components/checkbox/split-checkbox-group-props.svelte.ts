import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseCheckboxGroupProps } from './use-checkbox-group.svelte'

const splitFn = createSplitProps<UseCheckboxGroupProps>()

export const splitCheckboxGroupProps = <T extends UseCheckboxGroupProps>(props: T) =>
  splitFn(props, [
    'defaultValue',
    'value',
    'onValueChange',
    'disabled',
    'invalid',
    'readOnly',
    'name',
    'maxSelectedValues',
  ])
