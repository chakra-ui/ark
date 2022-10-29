import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { usePressable, UsePressableProps } from './use-pressable'

export type PressableProps = Omit<HTMLAtlasProps<'button'>, keyof UsePressableProps> &
  UsePressableProps

export const Pressable = forwardRef<'button', PressableProps>((props, ref) => {
  const { api, htmlProps } = usePressable(props)
  return <atlas.button {...htmlProps} {...api.pressableProps} ref={ref} />
})
