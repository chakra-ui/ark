import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseDateInputReturn } from './use-date-input.ts'
import { DateInputProvider } from './use-date-input-context.ts'

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
