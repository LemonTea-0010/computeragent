import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const storedName = localStorage.getItem('user_name') || '管理员'
  const storedLoggedIn = localStorage.getItem('user_logged_in') === '1'

  const userName = ref(storedName)
  const loggedIn = ref(storedLoggedIn)

  const login = (name: string) => {
    userName.value = name
    loggedIn.value = true
    localStorage.setItem('user_name', name)
    localStorage.setItem('user_logged_in', '1')
  }

  const logout = () => {
    loggedIn.value = false
    localStorage.removeItem('user_logged_in')
  }

  return { userName, loggedIn, login, logout }
})
