import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseNumberInputProps } from './use-number-input.svelte.ts'

const splitFn = createSplitProps<Optional<UseNumberInputProps, 'id'>>()

export const splitNumberInputProps = <T extends Optional<UseNumberInputProps, 'id'>>(props: T) =>
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
    'largeStep',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueCommit',
    'onValueInvalid',
    'pattern',
    'readOnly',
    'required',
    'scrubberDirection',
    'scrubberPixelSensitivity',
    'scrubberTeleportDistance',
    'smallStep',
    'snapOnStep',
    'spinOnPress',
    'step',
    'translations',
    'value',
  ])
