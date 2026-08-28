import { mergeProps } from '@zag-js/solid'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseFieldsetProps, useFieldset } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'

export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps<'fieldset'> {}
export interface FieldsetRootProps extends HTMLProps<'fieldset'>, FieldsetRootBaseProps {}

export const FieldsetRoot = (props: FieldsetRootProps) => {
  const [useFieldsetProps, localProps] = createSplitProps<UseFieldsetProps>()(props, ['id', 'disabled', 'invalid'])
  const fieldset = useFieldset(useFieldsetProps)
  const mergedProps = mergeProps(() => fieldset().getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} ref={composeRefs(fieldset().refs.rootRef, props.ref)} />
    </FieldsetProvider>
  )
}

FieldsetRoot.displayName = 'FieldsetRoot'
