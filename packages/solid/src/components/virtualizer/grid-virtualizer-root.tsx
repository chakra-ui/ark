import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseGridVirtualizerReturn } from './use-grid-virtualizer.ts'
import { GridVirtualizerProvider } from './use-grid-virtualizer-context.ts'

interface RootProps {
  /**
   * The virtualizer instance returned by `useGridVirtualizer`.
   */
  value: UseGridVirtualizerReturn
}

export interface GridVirtualizerRootBaseProps extends RootProps, PolymorphicProps<'div'> {}
export interface GridVirtualizerRootProps extends Assign<HTMLProps<'div'>, GridVirtualizerRootBaseProps> {}

const splitRootProps = createSplitProps<RootProps>()

export const GridVirtualizerRoot = (props: GridVirtualizerRootProps) => {
  const [rootProps, localProps] = splitRootProps(props, ['value'])
  const mergedProps = mergeProps(
    () => ({
      ...rootProps.value.getContainerAriaAttrs(),
      style: normalizeProps.style(rootProps.value.getContainerStyle()),
    }),
    localProps,
  )

  return (
    <GridVirtualizerProvider value={rootProps.value}>
      <ark.div
        {...mergedProps}
        ref={composeRefs(rootProps.value.ref, localProps.ref)}
        onScroll={(event) => {
          rootProps.value.getScrollHandler()(event)
          const onScroll = localProps.onScroll
          if (typeof onScroll === 'function') onScroll(event)
        }}
      />
    </GridVirtualizerProvider>
  )
}
