import { PageTabs } from '../../../components/PageTabs'

export default function Page({ params }) {
  return (
    <>
      <h1>Tabs</h1>
      <PageTabs value={params.slug} />
    </>
  )
}
