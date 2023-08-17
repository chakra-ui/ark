import { Stack } from 'styled-system/jsx'
import { Input, type InputProps } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export const InputDemo = (props: InputProps) => {
  return (
    <Stack gap="1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Your Name" {...props} />
    </Stack>
  )
}
