import { mergeProps } from '@zag-js/solid'
import { type JSX, Show } from 'solid-js'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'
import { useToggleContext } from './use-toggle-context'

export interface ToggleIndicatorBaseProps extends PolymorphicProps<'div'> {
  fallback?: JSX.Element
}

export interface ToggleIndicatorProps extends HTMLProps<'div'>, ToggleIndicatorBaseProps {}

export const ToggleIndicator = (props: ToggleIndicatorProps) => {
  const { children, fallback, ...restProps } = props
  const toggle = useToggleContext()
  const mergedProps = mergeProps(() => toggle().getIndicatorProps(), restProps)
  return (
    <ark.div {...mergedProps}>
      {/* @ts-ignore */}
      <Show when={toggle().pressed} fallback={fallback}>
        {children}
      </Show>
    </ark.div>
  )
}
