import type { PropsWithChildren } from 'react'
import { Navbar } from '~/components/navigation/navbar'
import { getServerContext } from '~/lib/server-context'

interface Props {
  params: Promise<{ framework: string }>
}

export default async function Layout(props: PropsWithChildren<Props>) {
  const params = await props.params
  const serverContext = getServerContext()
  serverContext.framework = params.framework

  return (
    <>
      <header>
        <Navbar />
      </header>
      {props.children}
    </>
  )
}
