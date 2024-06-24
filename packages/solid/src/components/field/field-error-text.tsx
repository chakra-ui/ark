import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldErrorTextBaseProps extends PolymorphicProps<'span'> {}
export interface FieldErrorTextProps extends HTMLProps<'span'>, FieldErrorTextBaseProps {}

export const FieldErrorText = (props: FieldErrorTextProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field().getErrorTextProps(), props)

  return (
    <Show when={field?.().invalid}>
      <ark.span {...mergedProps} />
    </Show>
  )
}
