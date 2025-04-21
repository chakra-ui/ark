import type { PropsWithChildren } from 'react'
import { styled } from 'styled-system/jsx'
import { Navbar } from '~/components/navigation/navbar'

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <styled.main pt="16" {...props} />
    </>
  )
}
