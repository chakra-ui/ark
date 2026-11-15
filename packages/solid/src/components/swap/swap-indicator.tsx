import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { splitProps } from '../../utils/split-props.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSwapContext } from './use-swap-context.ts'

export interface SwapIndicatorBaseProps extends PolymorphicProps<'span'> {
  type: 'on' | 'off'
}

export interface SwapIndicatorProps extends HTMLProps<'span'>, SwapIndicatorBaseProps {}

export const SwapIndicator = (props: SwapIndicatorProps) => {
  const [localProps, restProps] = splitProps(props, ['type', 'ref'])
  const swap = useSwapContext()
  const presence = () => {
    const p = localProps.type === 'on' ? swap().onPresence : swap().offPresence
    return p()
  }

  const mergedProps = mergeProps(() => swap().getIndicatorProps({ type: localProps.type }), restProps)

  return (
    <Show when={!presence().unmounted}>
      <ark.span {...mergedProps} ref={composeRefs((el) => presence().ref(el), localProps.ref)} />
    </Show>
  )
}
