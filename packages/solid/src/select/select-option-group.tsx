import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

type GetOptionGroupProps = { id: string }
export type SelectOptionGroupProps = Assign<HTMLArkProps<'div'>, GetOptionGroupProps>

export const SelectOptionGroup = (props: SelectOptionGroupProps) => {
  const [getOptionGroupProps, divProps] = createSplitProps<GetOptionGroupProps>()(props, ['id'])
  const select = useSelectContext()

  return <ark.div {...select().getOptionGroupProps(getOptionGroupProps)} {...divProps} />
}
