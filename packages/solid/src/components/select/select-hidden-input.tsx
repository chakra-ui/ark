import { mergeProps } from '@zag-js/solid'
import { For, createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface SelectHiddenInputProps extends HTMLProps<'input'>, SelectHiddenInputBaseProps {}

export const SelectHiddenInput = (props: SelectHiddenInputProps) => {
  const select = useSelectContext()
  const values = createMemo(() => {
    const value = select().value
    return value.length > 0 ? value : select().multiple ? [] : ['']
  })

  return (
    <For each={values()}>
      {(value) => {
        const mergedProps = mergeProps(() => {
          const { name, form, disabled } = select().getHiddenSelectProps()
          return { type: 'hidden', name, form, disabled, value }
        }, props)
        return <ark.input {...mergedProps} />
      }}
    </For>
  )
}
