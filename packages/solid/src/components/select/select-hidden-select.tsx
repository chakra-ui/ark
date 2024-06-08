import { mergeProps } from '@zag-js/solid'
import { Index, Show, createMemo } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectHiddenSelectProps extends HTMLArkProps<'select'> {}

export const SelectHiddenSelect = (props: SelectHiddenSelectProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getControlProps(), props)
  const isValueEmpty = createMemo(() => select().value.length === 0)

  return (
    <ark.select {...mergedProps}>
      <Show when={isValueEmpty()}>
        <option value="" />
      </Show>
      <Index each={select().collection.toArray()}>
        {(option) => <option value={option().value}>{option().label}</option>}
      </Index>
    </ark.select>
  )
}
