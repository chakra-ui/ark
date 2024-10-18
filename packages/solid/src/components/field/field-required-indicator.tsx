import { mergeProps } from '@zag-js/solid'
import { type JSX, Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps<'span'> {
  fallback?: JSX.Element
}
export interface FieldRequiredIndicatorProps
  extends HTMLProps<'span'>,
    FieldRequiredIndicatorBaseProps {}

export const FieldRequiredIndicator = (props: FieldRequiredIndicatorProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field().getRequiredIndicatorProps(), props)

  return (
    <Show when={field().required} fallback={props.fallback}>
      <ark.span {...mergedProps}>{props.children ?? '*'}</ark.span>
    </Show>
  )
}
