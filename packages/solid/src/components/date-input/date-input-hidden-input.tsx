import type { HiddenInputProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputHiddenInputBaseProps extends PolymorphicProps<'input'>, HiddenInputProps {}
export interface DateInputHiddenInputProps extends HTMLProps<'input'>, DateInputHiddenInputBaseProps {}

const splitHiddenInputProps = createSplitProps<HiddenInputProps>()

export const DateInputHiddenInput = (props: DateInputHiddenInputProps) => {
  const [hiddenInputProps, localProps] = splitHiddenInputProps(props, ['index', 'name'])
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getHiddenInputProps(hiddenInputProps), localProps)
  return <ark.input {...mergedProps} />
}
