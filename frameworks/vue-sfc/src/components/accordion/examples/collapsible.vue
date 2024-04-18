<script setup lang="ts">
import { ref } from 'vue'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
} from '..'

const items = ref(['React', 'Solid', 'Vue'])
</script>

<template>
    <AccordionRoot>
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