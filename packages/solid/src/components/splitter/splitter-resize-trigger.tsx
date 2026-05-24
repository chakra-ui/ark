import { mergeProps } from '@zag-js/solid'
import type { ResizeTriggerProps } from '@zag-js/splitter'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSplitterContext } from './use-splitter-context.ts'
import { SplitterResizeTriggerPropsProvider } from './use-splitter-resize-trigger-props-context.ts'

export interface SplitterResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps<'button'> {}
export interface SplitterResizeTriggerProps extends Assign<HTMLProps<'button'>, SplitterResizeTriggerBaseProps> {}

export const SplitterResizeTrigger = (props: SplitterResizeTriggerProps) => {
  const [resizeTriggerProps, restProps] = createSplitProps<ResizeTriggerProps>()(props, ['disabled', 'id'])
  const api = useSplitterContext()
  const mergedProps = mergeProps(() => api().getResizeTriggerProps(resizeTriggerProps), restProps)

  return (
    <SplitterResizeTriggerPropsProvider value={resizeTriggerProps}>
      <ark.button {...mergedProps} />
    </SplitterResizeTriggerPropsProvider>
  )
}
