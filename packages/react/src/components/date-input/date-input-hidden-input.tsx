import type { HiddenInputProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputHiddenInputBaseProps extends PolymorphicProps, HiddenInputProps {}
export interface DateInputHiddenInputProps extends HTMLProps<'input'>, DateInputHiddenInputBaseProps {}

const splitHiddenInputProps = createSplitProps<HiddenInputProps>()

export const DateInputHiddenInput = forwardRef<HTMLInputElement, DateInputHiddenInputProps>((props, ref) => {
  const [hiddenInputProps, localProps] = splitHiddenInputProps(props, ['index', 'name'])
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getHiddenInputProps(hiddenInputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

DateInputHiddenInput.displayName = 'DateInputHiddenInput'
