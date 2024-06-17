import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context'

export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps {}
export interface ComboboxItemGroupLabelProps
  extends HTMLAttributes<HTMLDivElement>,
    ComboboxItemGroupLabelBaseProps {}

export const ComboboxItemGroupLabel = forwardRef<HTMLDivElement, ComboboxItemGroupLabelProps>(
  (props, ref) => {
    const combobox = useComboboxContext()
    const itemGroupProps = useComboboxItemGroupPropsContext()
    const mergedProps = mergeProps(
      combobox.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
      props,
    )

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemGroupLabel.displayName = 'ComboboxItemGroupLabel'
