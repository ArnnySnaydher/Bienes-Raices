import { collection } from "firebase/firestore"
import {useFirestore,useCollection} from 'vuefire'
import { computed } from "vue"
export default function usePropiedades(){
 
    const db=useFirestore()
    const propiedadesCollection = useCollection(collection(db,'propiedades'))

    const propertyPrice = computed(()=>{
       return (precio) =>
       Number(precio).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
       })
    }
    )
    
    return{
        propiedadesCollection,
        propertyPrice
    }
}