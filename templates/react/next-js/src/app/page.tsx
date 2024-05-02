import { Avatar } from '~/components/avatar'
import { Checkbox } from '~/components/checkbox'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Ark UI</h1>
      <Avatar
        onStatusChange={(status) => console.log(status)}
        name="Christian Schröter"
        src="https://avatars.githubusercontent.com/u/1846056?s=400&u=bc2821d6154517e6f62795b11ffe0e8e001764a5&v=4"
      />
      <Checkbox onCheckedChange={(e) => console.log(e.checked)} />
    </main>
  )
}
