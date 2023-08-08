import { Dialog as DialogRoot, type DialogProps } from './dialog'
import { DialogBackdrop, type DialogBackdropProps } from './dialog-backdrop'
import { DialogCloseTrigger, type DialogCloseTriggerProps } from './dialog-close-trigger'
import { DialogContainer, type DialogContainerProps } from './dialog-container'
import { DialogContent, type DialogContentProps } from './dialog-content'
import { useDialogContext } from './dialog-context'
import { DialogDescription, type DialogDescriptionProps } from './dialog-description'
import { DialogTitle, type DialogTitleProps } from './dialog-title'
import { DialogTrigger, type DialogTriggerProps } from './dialog-trigger'
import { dialogAnatomy } from './dialog.anatomy'

const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Backdrop: DialogBackdrop,
  CloseTrigger: DialogCloseTrigger,
  Container: DialogContainer,
  Content: DialogContent,
  Description: DialogDescription,
  Title: DialogTitle,
  Trigger: DialogTrigger,
})

export {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  dialogAnatomy,
  useDialogContext,
}

export type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogContainerProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
}
