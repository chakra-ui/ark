import type { Assign } from '@ark-ui/react'
import { Avatar as ArkAvatar } from '@ark-ui/react/avatar'
import { UserIcon } from 'lucide-react'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type AvatarVariantProps, avatar } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface AvatarProps
  extends Assign<JsxStyleProps, ArkAvatar.RootProps>,
    AvatarVariantProps {
  name?: string | undefined | null
  src?: string | undefined | null
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const [variantProps, avatarProps] = avatar.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(avatarProps)
  const { name, src, className, ...rootProps } = localProps
  const styles = avatar(variantProps)

  return (
    <ArkAvatar.Root ref={ref} className={cx(styles.root, css(cssProps), className)} {...rootProps}>
      <ArkAvatar.Fallback className={styles.fallback}>
        {name ? getInitials(name) : <UserIcon />}
      </ArkAvatar.Fallback>
      {src && (
        <ArkAvatar.Image
          className={styles.image}
          src={src}
          alt={name ?? 'User Profile'}
          referrerPolicy="no-referrer"
        />
      )}
    </ArkAvatar.Root>
  )
})

Avatar.displayName = 'Avatar'

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase()
