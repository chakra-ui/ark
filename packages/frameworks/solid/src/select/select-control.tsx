import { mergeProps } from '@zag-js/solid'
import { createMemo, Index, Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl: ArkComponent<'div'> = (props: SelectControlProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().controlProps, props)
  const isValueEmpty = createMemo(() => api().value.length === 0)

  return (
    <>
      <ark.div {...mergedProps} />
      <select {...api().hiddenSelectProps}>
        <Show when={isValueEmpty()}>
          <option value="" />
        </Show>
        <Index each={api().collection.toArray()}>
          {(option) => <option value={option().value}>{option().label}</option>}
        </Index>
      </select>
    </>
  )
}
