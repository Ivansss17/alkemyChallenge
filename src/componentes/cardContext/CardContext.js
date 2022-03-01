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
        const filterVegan = cartList.filter((producto) => producto.vegan === true)
        setContVegan(filterVegan)
        const cantVegan = contVegan.reduce((prev, cart) => prev + cart.cantidad , 1)
        const filterNoVegan = cartList.filter((producto) => producto.vegan === false)
        setContNoVegan(filterNoVegan)
        const cantNoVegan = contNoVegan.reduce((prev, cart) => prev + cart.cantidad , 1)

       


        if(indice > -1 ) {
       
            alert('no puedes agregar el mismo plato al menu')
             }else{
                 if(cantTotal >= 4 ){
                     alert('Alcanso el limite de 4 platos para el menu')
                     
                    
             
                     }else{
                         
                             if(cantVegan >= 2 && Menus.vegan){
                                 alert('Alcanzo el limite de platos Veganos permitidos')
                     
                             } if (cantNoVegan >= 2 && Menus.vegan == false){
                                 alert('Alcanzo el limite de platos no Veganos permitidos')
         
                             }if(cantVegan < 2 && cantNoVegan < 2    ){
                                
                                 setCartList([...cartList, Menus])
                                 
                             }else{
                                 if(cantNoVegan < 2 && Menus.vegan == false){
                                     setCartList([...cartList, Menus])
                                 }else{
                                     if(cantVegan < 2 && Menus.vegan){
                                         setCartList([...cartList, Menus])
                                     }
     
                                 }
          
                
                             }}
                 
     
                 
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

