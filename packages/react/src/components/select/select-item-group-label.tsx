import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props'

export interface SelectItemGroupLabelBaseProps extends PolymorphicProps {}
export interface SelectItemGroupLabelProps
  extends HTMLAttributes<HTMLDivElement>,
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
