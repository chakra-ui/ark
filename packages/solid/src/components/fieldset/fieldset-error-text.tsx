import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'

export interface FieldsetErrorTextBaseProps extends PolymorphicProps<'span'> {}
export interface FieldsetErrorTextProps extends HTMLProps<'span'>, FieldsetErrorTextBaseProps {}

export const FieldsetErrorText = (props: FieldsetErrorTextProps) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(() => fieldset().getErrorTextProps(), props)

  return (
    <Show when={fieldset().invalid}>
      <ark.span {...mergedProps} />
    </Show>
  )
}
