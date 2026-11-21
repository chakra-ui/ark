import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandLabelBaseProps extends PolymorphicProps<'label'> {}
export interface CommandLabelProps extends HTMLProps<'label'>, CommandLabelBaseProps {}

export const CommandLabel = (props: CommandLabelProps) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(() => command().getLabelProps(), parts.label.attrs(''), props)

  return <ark.label {...mergedProps} />
}
