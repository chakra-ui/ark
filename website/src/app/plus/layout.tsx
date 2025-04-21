import type { PropsWithChildren } from 'react'
import { styled } from 'styled-system/jsx'

export default function Layout(props: PropsWithChildren) {
  return <styled.main pt="16" {...props} />
}
