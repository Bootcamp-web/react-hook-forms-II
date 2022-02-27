import React, {  useState } from 'react';
import { Recipe } from './components/Recipe';
import { ShoppingList } from './components/ShoppingList'
import { IngredientsContext } from './lib/useIngredients';

export  const App =()=> {
    const [items, setItems] = useState([]);
    const addItem = (item)=>{
       setItems([...items,item])
   }
    
    return(

        <div>
            <h2>App Shopping list</h2>
            <IngredientsContext.Provider value={{ingredients: items,addItem}}>

                <ShoppingList/>
                <Recipe/>
            </IngredientsContext.Provider>
        </div>
    )

}