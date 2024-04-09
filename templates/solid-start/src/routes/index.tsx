import { Title } from '@solidjs/meta'
import Counter from '~/components/Counter'
import { TabsDemo } from '~/components/Tabs'

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <TabsDemo />
    </main>
  )
}
