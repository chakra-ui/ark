import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseCheckboxProps } from './use-checkbox.svelte.ts'

const splitFn = createSplitProps<Optional<UseCheckboxProps, 'id'>>()

export const splitCheckboxProps = <T extends Optional<UseCheckboxProps, 'id'>>(props: T) =>
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
