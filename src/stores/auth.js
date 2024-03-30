import { defineStore } from 'pinia'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const login = ({email,password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        console.error(error.code)
        console.error(error.message)
      })
  }

  return {
    login
  }
})
