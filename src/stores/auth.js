import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser = ref(null)
  const errorMsg = ref('')
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
        console.log(authUser.value)

      })
      .catch((error) => {
        errorMsg.value = errorCode[error.code] || 'Error desconocido'
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(()=>{
    return authUser.value
  })

  return {
    login,
    hasError,
    errorMsg,
    isAuth
  }
})
