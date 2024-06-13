import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props'

export type SelectItemGroupLabelBaseProps = {}
export interface SelectItemGroupLabelProps
  extends HTMLArkProps<'div'>,
    SelectItemGroupLabelBaseProps {}

export const SelectItemGroupLabel = forwardRef<HTMLDivElement, SelectItemGroupLabelProps>(
  (props, ref) => {
    const select = useSelectContext()
    const itemGroupProps = useSelectItemGroupPropsContext()
    const mergedProps = mergeProps(
      select.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
      props,
    )

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectItemGroupLabel.displayName = 'SelectItemGroupLabel'
