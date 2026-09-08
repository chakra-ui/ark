import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseRatingGroupProps } from './use-rating-group.svelte.ts'

const splitFn = createSplitProps<Optional<UseRatingGroupProps, 'id'>>()

export const splitRatingGroupProps = <T extends Optional<UseRatingGroupProps, 'id'>>(props: T) =>
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
