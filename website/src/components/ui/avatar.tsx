import type { Assign } from '@ark-ui/react'
import { Avatar as ArkAvatar } from '@ark-ui/react/avatar'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type AvatarVariantProps, avatar } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface AvatarProps
  extends Assign<JsxStyleProps, ArkAvatar.RootProps>,
    AvatarVariantProps {
  name?: string
  src?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const [variantProps, avatarProps] = avatar.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(avatarProps)
  const { name, src, className, ...rootProps } = localProps
  const styles = avatar(variantProps)

  return (
    <ArkAvatar.Root ref={ref} className={cx(styles.root, css(cssProps), className)} {...rootProps}>
      <ArkAvatar.Fallback className={styles.fallback}>
        {getInitials(name) || <UserIcon />}
      </ArkAvatar.Fallback>
      <ArkAvatar.Image className={styles.image} src={src} alt={name} />
    </ArkAvatar.Root>
  )
})

Avatar.displayName = 'Avatar'

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <title>User Icon</title>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase()
