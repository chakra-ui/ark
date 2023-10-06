import { ark, type HTMLArkProps } from '../factory'

export interface DatePickerLabelProps extends HTMLArkProps<'label'> {}

export const DatePickerLabel = (props: DatePickerLabelProps) => {
  //   const api = useDatePickerContext()
  //   const mergedProps = mergeProps(api().labelProps, props)

  return <ark.label {...props} />
}
