import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context'

export type ComboboxItemGroupLabelBaseProps = {}
export interface ComboboxItemGroupLabelProps
  extends HTMLArkProps<'div'>,
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
