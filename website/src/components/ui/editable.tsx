'use client'
import { Editable } from '@ark-ui/react/editable'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { editable } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(editable)

export const Root = withProvider(styled(Editable.Root), 'root')
export const Area = withContext(styled(Editable.Area), 'area')
export const CancelTrigger = withContext(styled(Editable.CancelTrigger), 'cancelTrigger')
export const Control = withContext(styled(Editable.Control), 'control')
export const EditTrigger = withContext(styled(Editable.EditTrigger), 'editTrigger')
export const Input = withContext(styled(Editable.Input), 'input')
export const Label = withContext(styled(Editable.Label), 'label')
export const Preview = withContext(styled(Editable.Preview), 'preview')
export const SubmitTrigger = withContext(styled(Editable.SubmitTrigger), 'submitTrigger')
export const Context = Editable.Context

export interface RootProps extends ComponentProps<typeof Root> {}
export interface AreaProps extends ComponentProps<typeof Area> {}
export interface CancelTriggerProps extends ComponentProps<typeof CancelTrigger> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface EditTriggerProps extends ComponentProps<typeof EditTrigger> {}
export interface InputProps extends ComponentProps<typeof Input> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PreviewProps extends ComponentProps<typeof Preview> {}
export interface SubmitTriggerProps extends ComponentProps<typeof SubmitTrigger> {}
