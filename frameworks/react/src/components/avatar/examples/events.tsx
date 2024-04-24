import { Avatar } from '../..'

export const Events = () => {
  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }
  return (
    <Avatar.Root onStatusChange={handleStatusChange}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
    </Avatar.Root>
  )
}
