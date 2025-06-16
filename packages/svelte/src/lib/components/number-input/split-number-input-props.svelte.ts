import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseNumberInputProps } from './use-number-input.svelte'

const splitFn = createSplitProps<UseNumberInputProps>()

export const splitNumberInputProps = <T extends UseNumberInputProps>(props: T) =>
  splitFn(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'disabled',
    'focusInputOnChange',
    'form',
    'formatOptions',
    'id',
    'ids',
    'inputMode',
    'invalid',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueInvalid',
    'pattern',
    'readOnly',
    'required',
    'spinOnPress',
    'step',
    'translations',
    'value',
  ])
