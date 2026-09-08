import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseListVirtualizerReturn } from './use-list-virtualizer.ts'
import { ListVirtualizerProvider } from './use-list-virtualizer-context.ts'

interface RootProps {
  /**
   * The virtualizer instance returned by `useListVirtualizer`.
   */
  value: UseListVirtualizerReturn
}

export interface ListVirtualizerRootBaseProps extends RootProps, PolymorphicProps<'div'> {}
export interface ListVirtualizerRootProps extends Assign<HTMLProps<'div'>, ListVirtualizerRootBaseProps> {}

const splitRootProps = createSplitProps<RootProps>()

export const ListVirtualizerRoot = (props: ListVirtualizerRootProps) => {
  const [rootProps, localProps] = splitRootProps(props, ['value'])
  const mergedProps = mergeProps(
    () => ({
      ...rootProps.value.getContainerAriaAttrs(),
      style: normalizeProps.style(rootProps.value.getContainerStyle()),
    }),
    localProps,
  )

  return (
    <ListVirtualizerProvider value={rootProps.value}>
      <ark.div
        {...mergedProps}
        ref={composeRefs(rootProps.value.ref, localProps.ref)}
        onScroll={(event) => {
          rootProps.value.getScrollHandler()(event)
          const onScroll = localProps.onScroll
          if (typeof onScroll === 'function') onScroll(event)
        }}
      />
    </ListVirtualizerProvider>
  )
}
