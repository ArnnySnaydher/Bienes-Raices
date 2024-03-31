import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'


export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser =ref({})
  const errorMsg = ref('')
  const errorCode = {
    'auth/invalid-credential': 'Las credenciales son incorrectas'
  }
  const login = ({email,password}) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        
        authUser.value= userCredential.user;
        console.log(authUser.value);
        // ...
      })
      .catch((error) => {
        errorMsg.value = errorCode[error.code] || "Error desconocido"
        
      });
  }

  const hasError= computed(()=>{
    return errorMsg.value
  })

  return {
    login,
    hasError,
    errorMsg
  }
})
