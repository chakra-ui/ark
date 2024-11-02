import type { PropsWithChildren } from 'react'
import { styled } from 'styled-system/jsx'
import { Navbar } from '~/components/navigation/navbar'
import { getServerContext } from '~/lib/server-context'

interface Props {
  params: Promise<{ framework: string }>
}

export default async function Layout(props: PropsWithChildren<Props>) {
  const { framework } = await props.params
  const serverContext = getServerContext()
  serverContext.framework = framework

  return (
    <>
      <header>
        <Navbar />
      </header>
      <styled.main pt="16">{props.children}</styled.main>
    </>
  )
}
