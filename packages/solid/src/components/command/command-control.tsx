import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandControlBaseProps extends PolymorphicProps<'div'> {}
export interface CommandControlProps extends HTMLProps<'div'>, CommandControlBaseProps {}

export const CommandControl = (props: CommandControlProps) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(() => command().getControlProps(), parts.control.attrs(''), props)

  return <ark.div {...mergedProps} />
}
