import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseAvatarReturn } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

interface RootProviderProps {
  value: UseAvatarReturn
}

export interface AvatarRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const AvatarRootProvider = (props: AvatarRootProviderProps) => {
  const [{ value: avatar }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => avatar().getRootProps(), localProps)

  return (
    <AvatarProvider value={avatar}>
      <ark.div {...mergedProps} />
    </AvatarProvider>
  )
}
