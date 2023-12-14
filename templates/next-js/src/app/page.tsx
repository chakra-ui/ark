import { Avatar } from '@ark-ui/react/src/avatar'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Ark UI</h1>
      <Avatar.Root>
        <Avatar.Fallback>PA</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
      </Avatar.Root>
    </main>
  )
}
