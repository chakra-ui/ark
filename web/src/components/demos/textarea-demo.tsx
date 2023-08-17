import { Stack } from 'styled-system/jsx'
import { Label } from '~/components/ui/label'
import { Textarea, type TextareaProps } from '~/components/ui/textarea'

export const TextareaDemo = (props: TextareaProps) => {
  return (
    <Stack gap="1.5">
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" rows={4} {...props} />
    </Stack>
  )
}
