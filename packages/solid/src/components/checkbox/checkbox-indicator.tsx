import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

interface IndicatorProps {
  indeterminate?: boolean
}

export interface CheckboxIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'div'> {}
export interface CheckboxIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    CheckboxIndicatorBaseProps {}

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['indeterminate'])
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getIndicatorProps(), localProps)

  return (
    <ark.div
      {...mergedProps}
      hidden={!(indicatorProps.indeterminate ? checkbox().indeterminate : checkbox().checked)}
    />
  )
}
