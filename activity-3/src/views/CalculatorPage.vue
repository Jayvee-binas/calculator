<script setup>
import GoldCalculator from '../components/GoldCalculator.vue'

defineProps({
  karat: { type: String, required: true }
})
</script>

<template>
  <GoldCalculator :karat="karat" />
</template>
