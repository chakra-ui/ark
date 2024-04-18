<script setup lang="ts">
import { ref } from 'vue'
import AccordionRoot from '../accordion-root.vue'

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
    <AccordionRoot :collapsible="true">
        <AccordionItem v-for="item in items" :key="item" :value="item">
            <AccordionItemTrigger>
                What is {{ item }}?
                <AccordionItemIndicator>
                    ->
                </AccordionItemIndicator>
            </AccordionItemTrigger>
            <AccordionItemContent>
                {{ item }} is a JavaScript library for building user interfaces
            </AccordionItemContent>
        </AccordionItem>
    </AccordionRoot>
</template>