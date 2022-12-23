import { PageTabs } from '@/components/navigation/PageTabs'

// TODO remove me
export default function Page(props: any) {
  const { params } = props
  return (
    <>
      <h1>Tabs</h1>
      <PageTabs value={params.slug} />
    </>
  )
}
