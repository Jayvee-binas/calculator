<script setup>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import GoldCalculator from '../components/GoldCalculator.vue'

const KARATS = [ '24k', '22k', '21k', '18k', '14k', '12k', '10k' ]

const { user, logout } = useAuth()
const router = useRouter()

function onLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <header class="header" role="banner">
      <h1 class="header-title">Gold Calculator</h1>
      <div class="header-right">
        <span class="user-email">{{ user?.email }}</span>
        <button type="button" class="btn-logout" @click="onLogout">Log out</button>
      </div>
    </header>
    <main class="main">
      <div class="calculators-grid">
        <GoldCalculator v-for="k in KARATS" :key="k" :karat="k" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--sidebar-bg);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-email {
  font-size: 0.875rem;
  color: var(--text-muted);
}
.btn-logout {
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
}
.btn-logout:hover {
  color: var(--text);
  border-color: var(--text-muted);
}
.main {
  flex: 1;
  padding: 2rem;
  overflow: auto;
}
.calculators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
