<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signup } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

function onSubmit() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }
  const result = signup(email.value, password.value, name.value)
  if (result.ok) {
    router.push('/')
  } else {
    error.value = result.error
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Gold Price Calculator</h1>
      <h2>Sign up</h2>
      <form @submit.prevent="onSubmit" class="auth-form">
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="name" type="text" required placeholder="Your name" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required placeholder="you@example.com" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" required placeholder="••••••••" />
        </div>
        <div class="field">
          <label for="confirm">Confirm password</label>
          <input id="confirm" v-model="confirmPassword" type="password" required placeholder="••••••••" />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="btn-primary">Sign up</button>
      </form>
      <p class="switch">
        Already have an account? <router-link to="/login">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
}
.auth-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.auth-card h1 {
  font-size: 1.25rem;
  color: var(--accent);
  margin-bottom: 0.25rem;
}
.auth-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1.5rem;
}
.auth-form .field {
  margin-bottom: 1rem;
}
.auth-form label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.375rem;
}
.auth-form input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text);
  font-size: 1rem;
  box-sizing: border-box;
}
.auth-form input::placeholder {
  color: var(--text-muted);
}
.auth-form input:focus {
  outline: none;
  border-color: var(--accent);
}
.error {
  color: #f87171;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}
.btn-primary {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
}
.btn-primary:hover {
  filter: brightness(1.1);
}
.switch {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}
.switch a {
  color: var(--accent);
  text-decoration: none;
}
.switch a:hover {
  text-decoration: underline;
}
</style>
