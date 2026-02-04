import { ref, computed } from 'vue'

const STORAGE_KEY = 'gold-calc-user'

const user = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'))

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  function login(email, password) {
    const stored = localStorage.getItem('gold-calc-users')
    const users = stored ? JSON.parse(stored) : {}
    const account = users[email]
    if (!account || account.password !== password) {
      return { ok: false, error: 'Invalid email or password' }
    }
    user.value = { email: account.email, name: account.name }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    return { ok: true }
  }

  function signup(email, password, name) {
    const stored = localStorage.getItem('gold-calc-users')
    const users = stored ? JSON.parse(stored) : {}
    if (users[email]) {
      return { ok: false, error: 'Email already registered' }
    }
    users[email] = { email, password, name }
    localStorage.setItem('gold-calc-users', JSON.stringify(users))
    user.value = { email, name }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    return { ok: true }
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, isAuthenticated, login, signup, logout }
}
