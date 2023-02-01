import { getComponentDocuments } from '@/lib/contentlayer'
import { Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const { params } = props
  const sidebarItems = getComponentDocuments(params.framework).map((doc) => ({
    name: doc.name,
    route: doc.route,
  }))

  return (
    <Container>
      <Stack gap="24" direction="row">
        <panda.main flex="1" overflow="hidden" py="12">
          {props.children}
        </panda.main>
      </Stack>
    </Container>
  )
}

export default DocsLayout
