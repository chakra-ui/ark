import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

type OptionProps = Parameters<ReturnType<ReturnType<typeof useSelectContext>>['getOptionProps']>[0]
export type SelectOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const SelectOption = (props: SelectOptionProps) => {
  const [optionProps, liProps] = createSplitProps<OptionProps>()(props, [
    'disabled',
    'label',
    'value',
    'valueText', // TODO what is value text
  ])
  const select = useSelectContext()

  return <ark.li {...select().getOptionProps(optionProps)} {...liProps} />
}
