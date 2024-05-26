import type { PropsWithChildren } from 'react'
import { Box } from 'styled-system/jsx'
import { Navbar } from '~/components/navigation/navbar'
import { getServerContext } from '~/lib/server-context'

interface Props {
  params: { framework: string }
}

export default function Layout(props: PropsWithChildren<Props>) {
  const serverContext = getServerContext()
  serverContext.framework = props.params.framework

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Box pt="16">{props.children}</Box>
    </>
  )
}
