import React ,{useState, useContext, createContext} from 'react'


const CartContext = createContext([])

export function useCartContext () {
    return useContext(CartContext)
}


// Creacion Componente
export const CartContextProvider = ({children})=>{
    //estados y funciones globales
    const [cartList, setCartList] = useState([])
    const [contVegan, setContVegan] = useState([])
    const [contNoVegan, setContNoVegan] = useState([])
    

    function agregarAlMenu (Menus){
        const indice = cartList.findIndex(i => i.id === Menus.id)
        const cantTotal = cartList.reduce((prev, cart) => prev + cart.cantidad , 0)
        const filterVegan = contVegan.filter((producto) => producto.vegan === true)
        setContVegan(filterVegan)
        const cantVegan = contVegan.reduce((prev, cart) => prev + cart.cantidad , 0)
        const filterNoVegan = contNoVegan.filter((producto) => producto.vegan === false)
        setContNoVegan(filterNoVegan)
        const cantNoVegan = contNoVegan.reduce((prev, cart) => prev + cart.cantidad , 0)

        if(indice > -1 ) {
       
       alert('no puedes agregar el mismo plato al menu')
        }
        if(cantTotal >= 4){
            alert('Alcanso el limite de platos para el menu')
            console.log(cantTotal, 'total por item')
       console.log('alcanso el limite de platos para el menu')
        
        }
        if(cantVegan >= 2){
            alert('Alcanzo el limite de platos Veganos permitidos')

        }
        if(cantNoVegan >= 2){
            alert('debe agregar menu vegano')

        }else{
            
            
            setCartList([...cartList, Menus])
            
    }
    
        
    }
   function sumaTotal(Menus){
    
    const total = cartList.reduce((prev, cart) => prev + cart.pricePerServing * cart.cantidad , 0)

    return total
       
    }
   function promedioHealtScore(Menus){

    const cantTotal = cartList.reduce((prev, cart) => prev + cart.cantidad , 0)
    const totalHealtScore = cartList.reduce((prev, cart) => prev + cart.healthScore / cantTotal , 0)

    return totalHealtScore
       
    }

    function cantidadItems(Menus){

        const cantTotal = cartList.reduce((prev, cart) => prev + cart.cantidad , 0)
        

    return cantTotal

    }

    




    function eliminarItem(id){
        const filterItem = cartList.filter((producto) => producto.id !== id)
        setCartList(filterItem)
    }
    
    
   
    function vaciarCarrito (){
        setCartList([])
    }

    
    
    
    return(
        <CartContext.Provider value={{
            cartList,
            agregarAlMenu,
            vaciarCarrito,
            sumaTotal,
            promedioHealtScore,
            cantidadItems,
            eliminarItem
        }}>
            {children}
        </CartContext.Provider>

    )
}

