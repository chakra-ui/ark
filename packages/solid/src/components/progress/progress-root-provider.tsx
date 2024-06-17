import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseProgressReturn } from './use-progress'
import { ProgressProvider } from './use-progress-context'

interface RootProviderProps {
  value: UseProgressReturn
}

export interface ProgressRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface ProgressRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    ProgressRootProviderBaseProps {}

export const ProgressRootProvider = (props: ProgressRootProviderProps) => {
  const [{ value: progress }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => progress().getRootProps(), localProps)

  return (
    <ProgressProvider value={progress}>
      <ark.div {...mergedProps} />
    </ProgressProvider>
  )
}
