import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseWindowVirtualizerReturn } from './use-window-virtualizer.ts'
import { WindowVirtualizerProvider } from './use-window-virtualizer-context.ts'

interface RootProps {
  /**
   * The virtualizer instance returned by `useWindowVirtualizer`.
   */
  value: UseWindowVirtualizerReturn
}

export interface WindowVirtualizerRootBaseProps extends RootProps, PolymorphicProps<'div'> {}
export interface WindowVirtualizerRootProps extends Assign<HTMLProps<'div'>, WindowVirtualizerRootBaseProps> {}

const splitRootProps = createSplitProps<RootProps>()

export const WindowVirtualizerRoot = (props: WindowVirtualizerRootProps) => {
  const [rootProps, localProps] = splitRootProps(props, ['value'])
  const mergedProps = mergeProps(
    () => ({
      ...rootProps.value.getContainerAriaAttrs(),
      style: normalizeProps.style(rootProps.value.getContainerStyle()),
    }),
    localProps,
  )

  return (
    <WindowVirtualizerProvider value={rootProps.value}>
      <ark.div {...mergedProps} ref={composeRefs(rootProps.value.ref, localProps.ref)} />
    </WindowVirtualizerProvider>
  )
}
