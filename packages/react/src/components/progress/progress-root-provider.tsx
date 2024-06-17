import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseProgressReturn } from './use-progress'
import { ProgressProvider } from './use-progress-context'

interface RootProviderProps {
  value: UseProgressReturn
}

export interface ProgressRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ProgressRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    ProgressRootProviderBaseProps {}

export const ProgressRootProvider = forwardRef<HTMLDivElement, ProgressRootProviderProps>(
  (props, ref) => {
    const [{ value: progress }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(progress.getRootProps(), localProps)

    return (
      <ProgressProvider value={progress}>
        <ark.div {...mergedProps} ref={ref} />
      </ProgressProvider>
    )
  },
)

ProgressRootProvider.displayName = 'ProgressRootProvider'
