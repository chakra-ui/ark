import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseNumberFlowProps, useNumberFlow } from './use-number-flow.ts'
import { NumberFlowProvider } from './use-number-flow-context.ts'

export interface NumberFlowRootBaseProps extends UseNumberFlowProps, PolymorphicProps<'span'> {}
export interface NumberFlowRootProps extends Assign<HTMLProps<'span'>, NumberFlowRootBaseProps> {}

export const NumberFlowRoot = (props: NumberFlowRootProps) => {
  const [useNumberFlowProps, localProps] = createSplitProps<UseNumberFlowProps>()(props, [
    'continuous',
    'defaultValue',
    'formatOptions',
    'id',
    'ids',
    'live',
    'locale',
    'onAnimationComplete',
    'onAnimationStart',
    'onValueChange',
    'prefix',
    'respectMotionPreference',
    'spinTiming',
    'stagger',
    'suffix',
    'transformTiming',
    'trend',
    'value',
  ])

  const numberFlow = useNumberFlow(useNumberFlowProps)
  const mergedProps = mergeProps(() => numberFlow().getRootProps(), localProps)

  return (
    <NumberFlowProvider value={numberFlow}>
      <ark.span {...mergedProps} />
    </NumberFlowProvider>
  )
}
