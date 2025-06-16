import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseRatingGroupProps } from './use-rating-group.svelte'

const splitFn = createSplitProps<UseRatingGroupProps>()

export const splitRatingGroupProps = <T extends UseRatingGroupProps>(props: T) =>
  splitFn(props, [
    'allowHalf',
    'autoFocus',
    'count',
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'name',
    'onHoverChange',
    'onValueChange',
    'readOnly',
    'required',
    'translations',
    'value',
  ])
