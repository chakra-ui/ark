import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { useCommandItemPropsContext } from './use-command-item-props-context.ts'

export interface CommandItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface CommandItemTextProps extends HTMLProps<'span'>, CommandItemTextBaseProps {}

export const CommandItemText = (props: CommandItemTextProps) => {
  const command = useCommandContext()
  const itemProps = useCommandItemPropsContext()
  const mergedProps = mergeProps(() => command().getItemTextProps(itemProps), parts.itemText.attrs(''), props)

  return <ark.span {...mergedProps} />
}
