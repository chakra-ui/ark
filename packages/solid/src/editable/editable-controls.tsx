import type { Assign } from '@polymorphic-factory/solid'
import type { JSX } from 'solid-js'
import { children } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { EditableContext, useEditableContext } from './editable-context'

type EditableControlsParams = { children: (context: ReturnType<EditableContext>) => JSX.Element }
export type EditableControlsProps = Assign<HTMLArkProps<'div'>, EditableControlsParams>

export const EditableControls = (props: EditableControlsProps) => {
  const [controlsProps, divProps] = createSplitProps<EditableControlsParams>()(props, ['children'])
  const editable = useEditableContext()
  const view = () => children(() => runIfFn(controlsProps.children, editable()))

  return <ark.div {...divProps}>{view()}</ark.div>
}
