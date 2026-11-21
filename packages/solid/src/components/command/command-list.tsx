import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandListBaseProps extends PolymorphicProps<'div'> {}
export interface CommandListProps extends HTMLProps<'div'>, CommandListBaseProps {}

const keepInputFocus = (event: PointerEvent) => {
  if (event.button === 0) event.preventDefault()
}

export const CommandList = (props: CommandListProps) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(
    () => command().getListProps(),
    parts.list.attrs(''),
    { onPointerDown: keepInputFocus },
    props,
  )

  return <ark.div {...mergedProps} />
}
