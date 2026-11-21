import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { useCommandItemGroupPropsContext } from './use-command-item-group-props-context.ts'

export interface CommandItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
export interface CommandItemGroupLabelProps extends HTMLProps<'div'>, CommandItemGroupLabelBaseProps {}

export const CommandItemGroupLabel = (props: CommandItemGroupLabelProps) => {
  const command = useCommandContext()
  const itemGroupProps = useCommandItemGroupPropsContext()
  const mergedProps = mergeProps(
    () => command().getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
    parts.itemGroupLabel.attrs(''),
    props,
  )

  return <ark.div {...mergedProps} />
}
