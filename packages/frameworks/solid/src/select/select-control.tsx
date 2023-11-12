import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = (props: SelectControlProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} />
      <select {...api().hiddenSelectProps}>
        <Index each={api().collection.toArray()}>
          {(option) => <option value={option().value}>{option().label}</option>}
        </Index>
      </select>
    </>
  )
}
