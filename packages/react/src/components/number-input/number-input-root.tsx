'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseNumberInputProps, useNumberInput } from './use-number-input.ts'
import { NumberInputProvider } from './use-number-input-context.ts'

export interface NumberInputRootBaseProps extends UseNumberInputProps, PolymorphicProps {}
export interface NumberInputRootProps extends Assign<HTMLProps<'div'>, NumberInputRootBaseProps> {}

const splitRootProps = createSplitProps<UseNumberInputProps>()

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>((props, ref) => {
  const [useNumberInputProps, localProps] = splitRootProps(props, [
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
    'smallStep',
    'spinOnPress',
    'step',
    'translations',
    'value',
  ])
  const numberInput = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(numberInput.getRootProps(), localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInputRoot.displayName = 'NumberInputRoot'
