<script setup>
import { ref, computed } from 'vue'

const VAT_RATE = 0.12

const props = defineProps({
  karat: { type: String, required: true }
})

const weight = ref(0)
const pricePerGram = ref(0)
const selectedAccessory = ref('')
const customMakingCharge = ref(0)

const accessories = [
  { id: '', label: 'Select Accessory', charge: 0 },
  { id: 'ring', label: 'Ring', charge: 500 },
  { id: 'necklace', label: 'Necklace', charge: 800 },
  { id: 'bracelet', label: 'Bracelet', charge: 600 },
  { id: 'earrings', label: 'Earrings', charge: 400 },
  { id: 'pendant', label: 'Pendant', charge: 350 },
  { id: 'custom', label: 'Custom', charge: null }
]

const makingChargeAmount = computed(() => {
  const opt = accessories.find(a => a.id === selectedAccessory.value)
  if (opt && opt.charge != null && opt.id !== 'custom' && opt.id !== '') return opt.charge
  return Number(customMakingCharge.value) || 0
})

const isMakingChargePreset = computed(() => {
  const id = selectedAccessory.value
  return id && id !== 'custom'
})

const makingChargeDisplayValue = computed({
  get: () => (isMakingChargePreset.value ? makingChargeAmount.value : customMakingCharge.value),
  set: (val) => {
    customMakingCharge.value = Number(val) || 0
    if (selectedAccessory.value !== 'custom') selectedAccessory.value = 'custom'
  }
})

const goldValue = computed(() => {
  const w = Number(weight.value) || 0
  const p = Number(pricePerGram.value) || 0
  return w * p
})

const subtotal = computed(() => goldValue.value + makingChargeAmount.value)
const vatAmount = computed(() => subtotal.value * VAT_RATE)
const total = computed(() => subtotal.value + vatAmount.value)

function formatPeso(value) {
  return 'P' + Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

</script>

<template>
  <div class="calculator-card">
    <h1 class="calculator-title">{{ karat }} Gold</h1>

    <div class="field">
      <label>Weight (g)</label>
      <input v-model.number="weight" type="number" step="0.01" min="0" placeholder="0.00" />
    </div>

    <div class="field">
      <label>Price/Gram (P)</label>
      <input v-model.number="pricePerGram" type="number" step="0.01" min="0" placeholder="0.00" />
    </div>

    <div class="field making-charge">
      <label>Making Charge (P)</label>
      <div class="making-charge-row">
        <select v-model="selectedAccessory" class="select-accessory" aria-label="Select accessory type">
          <option v-for="a in accessories" :key="a.id" :value="a.id">
            {{ a.label }}
          </option>
        </select>
        <input
          v-model.number="makingChargeDisplayValue"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          class="making-charge-input"
          :disabled="isMakingChargePreset"
          aria-label="Making charge amount in pesos"
        />
      </div>
    </div>

    <div class="summary">
      <div class="summary-row">
        <span>Gold Value</span>
        <span>{{ formatPeso(goldValue) }}</span>
      </div>
      <div class="summary-row">
        <span>Making Charge</span>
        <span>{{ formatPeso(makingChargeAmount) }}</span>
      </div>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>{{ formatPeso(subtotal) }}</span>
      </div>
      <div class="summary-row">
        <span>VAT (12%)</span>
        <span>{{ formatPeso(vatAmount) }}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>{{ formatPeso(total) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.calculator-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 1.5rem;
}
.field {
  margin-bottom: 1.25rem;
}
.field label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}
.field input,
.field select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text);
  font-size: 1rem;
  box-sizing: border-box;
}
.field input:focus,
.field select:focus {
  outline: none;
  border-color: var(--accent);
}
.field input::placeholder {
  color: var(--text-muted);
}
.making-charge-row {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}
.select-accessory {
  min-width: 140px;
  width: auto;
  flex: 1;
  max-width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2rem;
  cursor: pointer;
}
.making-charge-input {
  flex: 1;
  min-width: 100px;
}
.making-charge-input:disabled {
  opacity: 0.85;
  cursor: default;
}
.summary {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  font-size: 0.9375rem;
  color: var(--text);
}
.summary-row.total {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--accent);
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}
</style>
