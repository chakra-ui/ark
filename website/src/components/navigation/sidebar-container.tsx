import type { PropsWithChildren } from 'react'
import { cx } from 'styled-system/css'

interface Props {
  className?: string
}

export const SidebarContainer = (props: PropsWithChildren<Props>) => {
  const { className } = props
  return <aside className={cx('scroller', className)}>{props.children}</aside>
}
