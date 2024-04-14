<script setup lang="tsx">
import { Toast, createToaster } from '../'
import './toast.css'

// Basic
const [BasicToaster, basicToast] = createToaster({
  placement: 'top-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})
const createBasicToast = () =>
  basicToast.value.create({
    title: 'Title',
    description: 'Description',
  })

// Customized
const [CustomizedToaster, customizedToast] = createToaster({
  placement: 'bottom-start',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})
const createCustomizedToast = () =>
  customizedToast.value.create({
    title: 'Success',
    description: 'This is a success toast',
    type: 'success',
    duration: 20000,
    removeDelay: 250,
  })

//
const [CustomRenderToaster, customRenderToast] = createToaster({
  placement: 'top-end',
  // custom render may go directly into the function below
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})
const createCustomRenderToast = () =>
  customRenderToast.value.create({
    title: 'Please checkout',
    render: (toast) => (
      <div>
        {toast.title} <a href="https://ark-ui.com">Ark UI</a>
      </div>
    ),
  })
</script>

<template>
  <Story title="Toast">
    <Variant title="Basic">
      <button @click="createBasicToast">Toast</button>
      <BasicToaster />
    </Variant>

    <Variant title="Customized">
      <button @click="createCustomizedToast">Toast</button>
      <CustomizedToaster />
    </Variant>

    <Variant title="CustomRender">
      <button @click="createCustomRenderToast">Toast</button>
      <CustomRenderToaster />
    </Variant>
  </Story>
</template>
