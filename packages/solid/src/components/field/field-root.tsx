import { mergeProps } from '@zag-js/solid'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseFieldProps, useField } from './use-field'
import { FieldProvider } from './use-field-context'

export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps<'div'> {}
export interface FieldRootProps extends HTMLProps<'div'>, FieldRootBaseProps {}

export const FieldRoot = (props: FieldRootProps) => {
  const [useFieldProps, localProps] = createSplitProps<UseFieldProps>()(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
    'readOnly',
    'required',
  ])
  const field = useField(useFieldProps)
  const mergedProps = mergeProps(() => field().getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} ref={composeRefs(field().refs.rootRef, props.ref)} />
    </FieldProvider>
  )
}
