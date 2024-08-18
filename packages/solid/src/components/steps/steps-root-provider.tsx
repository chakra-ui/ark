import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseStepsReturn } from './use-steps'
import { StepsProvider } from './use-steps-context'

interface RootProviderProps {
  value: UseStepsReturn
}

export interface StepsRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
export interface StepsRootProviderProps extends HTMLProps<'div'>, StepsRootProviderBaseProps {}

export const StepsRootProvider = (props: StepsRootProviderProps) => {
  const [{ value: steps }, rootProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => steps().getRootProps(), rootProps)

  return (
    <StepsProvider value={steps}>
      <ark.div {...mergedProps}>{props.children}</ark.div>
    </StepsProvider>
  )
}
