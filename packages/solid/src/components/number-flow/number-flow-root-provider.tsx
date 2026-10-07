import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseNumberFlowReturn } from './use-number-flow.ts'
import { NumberFlowProvider } from './use-number-flow-context.ts'

interface RootProviderProps {
  value: UseNumberFlowReturn
}

export interface NumberFlowRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'span'> {}
export interface NumberFlowRootProviderProps extends HTMLProps<'span'>, NumberFlowRootProviderBaseProps {}

export const NumberFlowRootProvider = (props: NumberFlowRootProviderProps) => {
  const [{ value: numberFlow }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => numberFlow().getRootProps(), localProps)

  return (
    <NumberFlowProvider value={numberFlow}>
      <ark.span {...mergedProps} />
    </NumberFlowProvider>
  )
}
