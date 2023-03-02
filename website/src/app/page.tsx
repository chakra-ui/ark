import { CodeExample } from '@/components/marketing/CodeExample'
import { Frameworks } from '@/components/marketing/Frameworks'
import { Hero } from '@/components/marketing/Hero'
import { Showcase } from '@/components/marketing/Showcase'
import { Testimonials } from '@/components/marketing/Testimonials'
import { Navbar } from '@/components/navigation/navbar/Navbar'

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <Frameworks />
      <CodeExample />
      <Testimonials />
    </>
  )
}
