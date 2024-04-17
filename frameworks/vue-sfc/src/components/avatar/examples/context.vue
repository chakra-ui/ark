<script setup lang="ts">
import AvatarContext from '../avatar-context.vue'
import AvatarFallback from '../avatar-fallback.vue'
import AvatarImage from '../avatar-image.vue'
import AvatarRoot from '../avatar-root.vue'
</script>

<template>
    <AvatarRoot id="123">
        <AvatarContext v-slot="{ avatar }">
            <AvatarFallback>
                {{ avatar.isLoaded ? 'PA' : 'Loading' }}
            </AvatarFallback>
        </AvatarContext>
        <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
    </AvatarRoot>
</template>
