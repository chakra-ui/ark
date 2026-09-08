<script setup lang="ts">
import { Tabs } from '@ark-ui/vue/tabs'
import styles from 'styles/tabs.module.css'
</script>

<template>
  <Tabs.Root :class="styles.Root" default-value="account">
    <Tabs.List :class="styles.List">
      <Tabs.Trigger :class="styles.Trigger" value="account" #render="ctx">
        <a href="#account" v-bind="ctx.props">Account</a>
      </Tabs.Trigger>
      <Tabs.Trigger :class="styles.Trigger" value="password" #render="ctx">
        <a href="#password" v-bind="ctx.props">Password</a>
      </Tabs.Trigger>
      <Tabs.Trigger :class="styles.Trigger" value="billing" #render="ctx">
        <a href="#billing" v-bind="ctx.props">Billing</a>
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content :class="styles.Content" value="account">Make changes to your account here.</Tabs.Content>
    <Tabs.Content :class="styles.Content" value="password">Change your password here.</Tabs.Content>
    <Tabs.Content :class="styles.Content" value="billing">Manage your billing and payment details.</Tabs.Content>
  </Tabs.Root>
</template>
