import { mergeProps } from '@zag-js/solid'
import { Index, Show, createMemo } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = (props: SelectControlProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().controlProps, props)
  const isValueEmpty = createMemo(() => select().value.length === 0)

  return (
    <>
      <ark.div {...mergedProps} />
      <select {...select().hiddenSelectProps}>
        <Show when={isValueEmpty()}>
          <option value="" />
        </Show>
        <Index each={select().collection.toArray()}>
          {(option) => <option value={option().value}>{option().label}</option>}
        </Index>
      </select>
    </>
  )
}
