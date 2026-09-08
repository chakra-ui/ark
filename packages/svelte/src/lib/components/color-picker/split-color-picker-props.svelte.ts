import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseColorPickerProps } from './use-color-picker.svelte.ts'

const splitFn = createSplitProps<Optional<UseColorPickerProps, 'id'>>()

export const splitColorPickerProps = <T extends Optional<UseColorPickerProps, 'id'>>(props: T) =>
  splitFn(props, [
    'closeOnSelect',
    'defaultOpen',
    'defaultValue',
    'defaultFormat',
    'disabled',
    'format',
    'id',
    'ids',
    'initialFocusEl',
    'invalid',
    'name',
    'onFocusOutside',
    'onFormatChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onValueChange',
    'onValueChangeEnd',
    'open',
    'openAutoFocus',
    'positioning',
    'readOnly',
    'required',
    'value',
    'inline',
  ])
