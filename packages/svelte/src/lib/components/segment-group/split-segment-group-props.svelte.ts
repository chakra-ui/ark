import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseSegmentGroupProps } from './use-segment-group.svelte'

const splitFn = createSplitProps<UseSegmentGroupProps>()

export const splitSegmentGroupProps = <T extends UseSegmentGroupProps>(props: T) =>
  splitFn(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
