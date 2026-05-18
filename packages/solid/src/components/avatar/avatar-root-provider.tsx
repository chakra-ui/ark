import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseAvatarReturn } from './use-avatar.ts'
import { AvatarProvider } from './use-avatar-context.ts'

interface RootProviderProps {
  value: UseAvatarReturn
}

export interface AvatarRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface AvatarRootProviderProps extends HTMLProps<'div'>, RootProviderProps, AvatarRootProviderBaseProps {}

export const AvatarRootProvider = (props: AvatarRootProviderProps) => {
  const [{ value: avatar }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => avatar().getRootProps(), localProps)

  return (
    <AvatarProvider value={avatar}>
      <ark.div {...mergedProps} />
    </AvatarProvider>
  )
}
