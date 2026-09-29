import { mergeProps } from '@zag-js/solid'
import { type JSX, Show, splitProps } from 'solid-js'
import type { HTMLProps, PolymorphicProps } from '../factory.tsx'
import { ark } from '../factory.tsx'
import { useToggleContext } from './use-toggle-context.ts'

export interface ToggleIndicatorBaseProps extends PolymorphicProps<'span'> {
  fallback?: JSX.Element
}

export interface ToggleIndicatorProps extends HTMLProps<'span'>, ToggleIndicatorBaseProps {}

export const ToggleIndicator = (props: ToggleIndicatorProps) => {
  const [baseProps, restProps] = splitProps(props, ['children', 'fallback'])
  const toggle = useToggleContext()
  const mergedProps = mergeProps(() => toggle().getIndicatorProps(), restProps)
  return (
    <ark.span {...mergedProps}>
      <Show when={toggle().pressed} fallback={baseProps.fallback}>
        {baseProps.children}
      </Show>
    </ark.span>
  )
}
