import { ark } from '@ark-ui/react'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { UseStepsReturn } from './use-steps'
import { StepsProvider } from './use-steps-context'

export interface StepsRootProviderBaseProps {
  value: UseStepsReturn
}

export interface StepsRootProviderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StepsRootProviderBaseProps {
  children: React.ReactNode
}

export const StepsRootProvider = forwardRef<HTMLDivElement, StepsRootProviderProps>(
  (props, ref) => {
    const [{ value: steps }, rootProps] = createSplitProps<StepsRootProviderBaseProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(steps.getRootProps(), rootProps)

    return (
      <StepsProvider value={steps}>
        <ark.div {...mergedProps} ref={ref}>
          {props.children}
        </ark.div>
      </StepsProvider>
    )
  },
)

StepsRootProvider.displayName = 'StepsRootProvider'
