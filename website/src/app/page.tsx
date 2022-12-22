import { allComponentDocuments } from '@/contentlayer'
import { Hero } from '../components/marketing/Hero'

export default function Page(props) {
  const { params } = props
  const componentDocs = allComponentDocuments
  console.log(componentDocs)
  return (
    <>
      <Hero />
    </>
  )
}
