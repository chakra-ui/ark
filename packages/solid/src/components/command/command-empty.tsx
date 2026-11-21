import { mergeProps } from '@zag-js/solid'
import { Show, createMemo } from 'solid-js'
import { splitProps } from '../../utils/split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandEmptyBaseProps extends PolymorphicProps<'div'> {}
export interface CommandEmptyProps extends HTMLProps<'div'>, CommandEmptyBaseProps {}

export const CommandEmpty = (props: CommandEmptyProps) => {
  const [localProps, restProps] = splitProps(props, ['children'])
  const command = useCommandContext()
  const isEmpty = createMemo(() => command().collection.size === 0)
  const mergedProps = mergeProps(() => command().getEmptyProps(), parts.empty.attrs(''), restProps)

  return (
    <ark.div {...mergedProps}>
      <Show when={isEmpty()}>{localProps.children}</Show>
    </ark.div>
  )
}
