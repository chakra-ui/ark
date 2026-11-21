import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandInputBaseProps extends PolymorphicProps<'input'> {}
export interface CommandInputProps extends HTMLProps<'input'>, CommandInputBaseProps {}

export const CommandInput = (props: CommandInputProps) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(() => command().getInputProps(), parts.input.attrs(''), props)

  return <ark.input {...mergedProps} />
}
