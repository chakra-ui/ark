import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseProgressReturn } from './use-progress'
import { ProgressProvider } from './use-progress-context'

interface RootProviderProps {
  value: UseProgressReturn
}

export interface ProgressRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface ProgressRootProviderProps
  extends HTMLProps<'div'>,
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
