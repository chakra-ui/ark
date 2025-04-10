import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './ui/button'

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus()
  return <Button type="submit" loading={pending} {...props} />
}
