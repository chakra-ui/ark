import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseClipboardReturn } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

interface RootProviderProps {
  value: UseClipboardReturn
}

export interface ClipboardRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const ClipboardRootProvider = (props: ClipboardRootProviderProps) => {
  const [{ value: clipboard }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => clipboard().rootProps, localProps)

  return (
    <ClipboardProvider value={clipboard}>
      <ark.div {...mergedProps} />
    </ClipboardProvider>
  )
}
