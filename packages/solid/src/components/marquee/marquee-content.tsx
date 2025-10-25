import { mergeProps } from '@zag-js/solid'
import { type FlowComponent, For } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeContentBaseProps extends PolymorphicProps<'div'> {}
export interface MarqueeContentProps extends HTMLProps<'div'>, MarqueeContentBaseProps {}

export const MarqueeContent: FlowComponent<MarqueeContentProps> = (props) => {
  const context = useMarqueeContext()

  return (
    <For each={Array.from({ length: context().contentCount })}>
      {(_, index) => {
        const mergedProps = mergeProps(() => context().getContentProps({ index: index() }), props)
        return <ark.div {...mergedProps}>{props.children}</ark.div>
      }}
    </For>
  )
}
