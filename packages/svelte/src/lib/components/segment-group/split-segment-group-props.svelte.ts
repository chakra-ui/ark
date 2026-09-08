import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseSegmentGroupProps } from './use-segment-group.svelte.ts'

const splitFn = createSplitProps<Optional<UseSegmentGroupProps, 'id'>>()

export const splitSegmentGroupProps = <T extends Optional<UseSegmentGroupProps, 'id'>>(props: T) =>
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
