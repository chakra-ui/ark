'use client'
import { Portal } from '@ark-ui/react/portal'
import { MessageSquareIcon, XIcon } from 'lucide-react'
import { forwardRef, useActionState, useEffect, useState } from 'react'
import { HStack, Stack } from 'styled-system/jsx'
import { contact } from '~/app/actions'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Field } from '~/components/ui/field'
import { useUpdateEffect } from '~/lib/use-update-effect'
import { SubmitButton } from './submit-button'
import { toaster } from './toaster'
import { IconButton, type IconButtonProps } from './ui/icon-button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface Props {
  subject?: string
  children: React.ReactNode
}

export const ContactDialog = (props: Props) => {
  const { subject = 'General', children } = props
  const [state, formAction] = useActionState(contact, {
    message: '',
    success: undefined,
  })
  const [open, setOpen] = useState(false)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)

  useEffect(() => {
    if (open) {
      setNum1(Math.floor(Math.random() * 10))
      setNum2(Math.floor(Math.random() * 10))
    }
  }, [open])

  const handleSubmit = async (formData: FormData) => {
    const answer = Number.parseInt(formData.get('captcha') as string)
    if (answer !== num1 + num2) {
      toaster.error({ title: 'Incorrect captcha answer' })
      return
    }
    formAction(formData)
  }

  useUpdateEffect(() => {
    if (state.success) {
      setOpen(false)
      toaster.create({ title: state.message })
    } else {
      toaster.error({ title: state.message })
    }
  }, [state])

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="4">
            <form action={handleSubmit}>
              <Stack gap="1">
                <Dialog.Title textStyle="lg">Contact Us</Dialog.Title>
                <Dialog.Description textStyle="sm">
                  Questions? We'll get back to you as soon as possible.
                </Dialog.Description>
              </Stack>

              <Stack gap={{ base: '6', md: '8' }}>
                <Stack gap="4" pt="5">
                  <Field.Root required>
                    <Field.Label>Name</Field.Label>
                    <Field.Input type="text" asChild>
                      <Input placeholder="John Doe" name="name" required />
                    </Field.Input>
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>E-Mail</Field.Label>
                    <Field.Input asChild>
                      <Input placeholder="me@example.com" name="email" type="email" required />
                    </Field.Input>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Message</Field.Label>
                    <Field.Textarea autoresize asChild>
                      <Textarea name="message" placeholder="How can we assist you?" required rows={4} />
                    </Field.Textarea>
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      What is {num1} + {num2}?
                    </Field.Label>
                    <Field.Input asChild>
                      <Input placeholder="Enter the sum" name="captcha" type="number" required />
                    </Field.Input>
                  </Field.Root>
                  <input type="hidden" name="subject" value={subject} />
                </Stack>
              </Stack>
              <HStack pt="8" justifyContent="flex-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <SubmitButton>Submit</SubmitButton>
              </HStack>
              <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
                <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
                  <XIcon />
                </IconButton>
              </Dialog.CloseTrigger>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export const FloatingContactButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <IconButton
    ref={ref}
    borderRadius="full"
    aria-label="Contact Us"
    position="fixed"
    bottom="6"
    right="6"
    boxShadow="lg"
    css={{
      '& svg': {
        width: '6',
        height: '6',
      },
      _hover: {
        transform: 'scale(1.1)',
      },
    }}
    size="xl"
    {...props}
  >
    <MessageSquareIcon fill="white" />
  </IconButton>
))

FloatingContactButton.displayName = 'FloatingContactButton'
