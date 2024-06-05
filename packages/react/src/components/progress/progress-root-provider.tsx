import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseProgressReturn } from './use-progress'
import { ProgressProvider } from './use-progress-context'

interface RootProviderProps {
  value: UseProgressReturn
}

export interface ProgressRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const ProgressRootProvider = forwardRef<HTMLDivElement, ProgressRootProviderProps>(
  (props, ref) => {
    const [{ value: progress }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(progress.rootProps, localProps)

    return (
      <ProgressProvider value={progress}>
        <ark.div {...mergedProps} ref={ref} />
      </ProgressProvider>
    )
  },
)

ProgressRootProvider.displayName = 'ProgressRootProvider'
