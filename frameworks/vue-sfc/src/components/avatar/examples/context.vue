<script setup lang="ts">
import { Avatar } from '..'
</script>

<template>
    <Avatar.Root id="123">
        <Avatar.Context v-slot="{ avatar }">
            <Avatar.Fallback>
                {{ avatar.isLoaded ? 'PA' : 'Loading' }}
            </Avatar.Fallback>
        </Avatar.Context>
        <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Root>
</template>
