import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { ark } from '../factory'
import type { UseStepsReturn } from './use-steps'
import { StepsProvider } from './use-steps-context'

export interface StepsRootProviderBaseProps {
  value: UseStepsReturn
}

export interface StepsRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    StepsRootProviderBaseProps {
  children: JSX.Element
}

export const StepsRootProvider = (props: StepsRootProviderProps) => {
  const [{ value: steps }, rootProps] = createSplitProps<StepsRootProviderBaseProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => steps().getRootProps(), rootProps)

  return (
    <StepsProvider value={steps}>
      <ark.div {...mergedProps}>{props.children}</ark.div>
    </StepsProvider>
  )
}
