import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseDateInputReturn } from './use-date-input'
import { DateInputProvider } from './use-date-input-context'

interface RootProviderProps {
  value: UseDateInputReturn
}

export interface DateInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
export interface DateInputRootProviderProps extends HTMLProps<'div'>, DateInputRootProviderBaseProps {}

export const DateInputRootProvider = (props: DateInputRootProviderProps) => {
  const [{ value: dateInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => dateInput().getRootProps(), localProps)

  return (
    <DateInputProvider value={dateInput}>
      <ark.div {...mergedProps} />
    </DateInputProvider>
  )
}
