import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser = ref(null)
  const errorMsg = ref('')
  const router = useRouter()
  const errorCode = {
    'auth/invalid-credential': 'Las credenciales son incorrectas'
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authUser.value = userCredential.user
        router.push({ name: 'admin-propiedades' })
      })
      .catch((error) => {
        errorMsg.value = errorCode[error.code] || 'Error desconocido'
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' })
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error)
        // An error happened.
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    login,
    logout,
    hasError,
    errorMsg,
    isAuth
  }
})
