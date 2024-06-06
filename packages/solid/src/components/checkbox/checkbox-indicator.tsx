import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

interface IndicatorProps {
  indeterminate?: boolean
}

export interface CheckboxIndicatorProps extends Assign<HTMLArkProps<'div'>, IndicatorProps> {}

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
