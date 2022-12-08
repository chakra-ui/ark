import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

type OptionGroupLabelProps = { htmlFor: string }
export type SelectOptionGroupLabelProps = Assign<HTMLArkProps<'label'>, OptionGroupLabelProps>

export const SelectOptionGroupLabel = (props: SelectOptionGroupLabelProps) => {
  const [optionProps, labelProps] = createSplitProps<OptionGroupLabelProps>()(props, ['htmlFor'])
  const select = useSelectContext()

  return <ark.label {...select().getOptionGroupLabelProps(optionProps)} {...labelProps} />
}
