import type { OpenChangeDetails } from '@zag-js/dialog'
import {
  DialogBackdrop as Backdrop,
  type DialogBackdropProps as BackdropProps,
} from './dialog-backdrop'
import {
  DialogCloseTrigger as CloseTrigger,
  type DialogCloseTriggerProps as CloseTriggerProps,
} from './dialog-close-trigger'
import { DialogContent as Content, type DialogContentProps as ContentProps } from './dialog-content'
import {
  DialogDescription as Description,
  type DialogDescriptionProps as DescriptionProps,
} from './dialog-description'
import {
  DialogPositioner as Positioner,
  type DialogPositionerProps as PositionerProps,
} from './dialog-positioner'
import { DialogRoot as Root, type DialogRootProps as RootProps } from './dialog-root'
import { DialogTitle as Title, type DialogTitleProps as TitleProps } from './dialog-title'
import { DialogTrigger as Trigger, type DialogTriggerProps as TriggerProps } from './dialog-trigger'

export { Backdrop, CloseTrigger, Content, Description, Positioner, Root, Title, Trigger }
export type {
  BackdropProps,
  CloseTriggerProps,
  ContentProps,
  DescriptionProps,
  OpenChangeDetails,
  PositionerProps,
  RootProps,
  TitleProps,
  TriggerProps,
}
