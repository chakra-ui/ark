import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { EditableProvider } from './editable-context'
import { useEditable, UseEditableProps } from './use-editable'

export type EditableProps = Omit<HTMLAtlasProps<'div'>, keyof UseEditableProps> & UseEditableProps

export const Editable = forwardRef<'div', EditableProps>((props, ref) => {
  const { api, htmlProps } = useEditable(props)

  return (
    <EditableProvider value={api}>
      <atlas.div {...htmlProps} {...api.rootProps} ref={ref} />
    </EditableProvider>
  )
})
