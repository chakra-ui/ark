import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseClipboardProps, useClipboard } from './use-clipboard.ts'
import { ClipboardProvider } from './use-clipboard-context.ts'

export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps<'div'> {}
export interface ClipboardRootProps extends HTMLProps<'div'>, ClipboardRootBaseProps {}

export const ClipboardRoot = (props: ClipboardRootProps) => {
  const [useClipboardProps, localProps] = createSplitProps<UseClipboardProps>()(props, [
    'defaultValue',
    'id',
    'ids',
    'onStatusChange',
    'onValueChange',
    'timeout',
    'translations',
    'value',
  ])
  const api = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ClipboardProvider value={api}>
      <ark.div {...mergedProps} />
    </ClipboardProvider>
  )
}
