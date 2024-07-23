import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseFieldsetProps, useFieldset } from './use-fieldset'
import { FieldsetProvider } from './use-fieldset-context'

export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps<'fieldset'> {}
export interface FieldsetRootProps extends HTMLProps<'fieldset'>, FieldsetRootBaseProps {}

export const FieldsetRoot = (props: FieldsetRootProps) => {
  const [useFieldsetProps, localProps] = createSplitProps<UseFieldsetProps>()(props, [
    'id',
    'disabled',
    'invalid',
  ])
  const fieldset = useFieldset(useFieldsetProps)
  const mergedProps = mergeProps(() => fieldset().getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} />
    </FieldsetProvider>
  )
}

FieldsetRoot.displayName = 'FieldsetRoot'
