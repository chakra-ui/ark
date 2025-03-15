import { Avatar } from '@ark-ui/react/avatar'

export const Events = () => {
  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }
  return (
    <Avatar.Root onStatusChange={handleStatusChange}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300?u=a042581f4e29026704d" alt="avatar" />
    </Avatar.Root>
  )
}
