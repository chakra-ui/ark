<script setup lang="ts">
import { AvatarContext, AvatarFallback, AvatarImage, AvatarRoot } from '..'
</script>

<template>
    <AvatarRoot>
        <AvatarContext v-slot="avatar">
            <AvatarFallback>
                {{ avatar.isLoaded ? 'PA' : 'Loading' }}
            </AvatarFallback>
        </AvatarContext>
        <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
    </AvatarRoot>
</template>