import { defineStore } from 'pinia'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const errorCode = {
    'auth/user-not-found' : 'Usuario no encontrado',
    'auth/wrong-password' : 'Password es incorrecto'
  }
  const login = ({email,password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch(error => {
        console.error(errorCode[error.code] || error.message)
      
      })
  }

  return {
    login
  }
})
