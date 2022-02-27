# React-hook-forms-II

0. [Viene de proyectos anteriores](#schema0)
1. [Inicializamos NPM e instalamos paquetes necesarios](#schema1)
1. [ Modificamos `HaveIngredients.tsx`](#schema2)
1. [ Modificamos `Recipe.tsx`](#schema3)
1. [ Creamos nuevo componente `FullRecipe.tsx` y modificamos `Recipe.tsx` ](#schema4)
1. [ Modificamos `useIngredients.tsx` y modificamos `HaveIngredients.tsx` ](#schema5)

1. [ Añadimos estilos al item, modificamos `Item.tsx`,](#schema6)
1. [ Modificamos `InputItem.tsx`](#schema7)
1. [ Añadimos props a  `InputItem.tsx`y `ShoppingList.tsx`](#schema8)
1. [ Modificamos `Item.tsx` ](#schema9)
1. [ Creamos `HaveIngredient.tsx` y `Recipe.tsx` ](#schema10)
1. [ Creando contexto `useIngredients.tsx` ,modificamos `App.tsx` , `Recipe.tsx`y  `HaveIngredient.tsx` ](#schema11)
1. [ Quitamos la función de `ShoppingList.tsx` y la ponemos en `App.tsx` ](#schema12)
1. [ Ejecutamos Typescript ](#schema2)

<hr>

<a name="schema0"></a>

# 0 Viene de proyectos anteriores

https://github.com/Bootcamp-web/react-hook-forms-I

<hr>

<a name="schema1"></a>


# 1 Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc
~~~
npm install
~~~
~~~
tsc --init
~~~
<hr>

<a name="schema2"></a>


# 2 Modificamos `HaveIngredients.tsx`
~~~tsx
import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const HaveIngredient = ({ ing }) => {

  const { ingredients }  = useIngredient();
  if(ingredients.filter((e)=>e.ingredient ===ing ).length > 0)
  {
    return (
      <p style={{ color: 'green' }}>
        {' '}
        I have
        {' '}
        {ing}
      </p>
    );
  }
  return (
    <p style={{ color: 'red' }}>
      {' '}
      I dont have any
      {' '}
      {ing}
    </p>
  );
  
}
~~~

<hr>

<a name="schema3"></a>

# 3 Modificamos `Recipe.tsx`
~~~tsx
import React from 'react';
import { HaveIngredient } from './HaveIngredient';


const recipe = ['apples', 'flour', 'eggs', 'milk'];

export const Recipe = () => {
  return(
    <div>
      <h2>Recipe</h2>
      {recipe.map((e) => <HaveIngredient key={e} ing={e} />)}
 
    </div>
  )
}
~~~
<hr>

<a name="schema4"></a>

# 4 Creamos nuevo componente `FullRecipe.tsx` y modificamos `Recipe.tsx`
- `FullRecipe.tsx`
~~~tsx 
import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const FullRecipe = ({ recipe }) => {
    const { ingredients, hasIngredient } = useIngredient();
    const completedIngredients =  recipe.filter((ingredient)=>ingredients.map((e)=>e.ingredient)
    .includes(ingredient));

    const setRecipe = new Set(completedIngredients);
    const missingIngredients = new Set([...recipe].filter((x) => !setRecipe.has(x)));



    if (completedIngredients.length ===recipe.length) {
      return (<p>✅Receta completa</p>);
    }
    return (
      <p>
        ❌
        {' '}
        <b>Faltan ingredients: </b>
      </p>
    );
  };
~~~
- `Recipe.tsx`
~~~tsx
import React from 'react';
import { HaveIngredient } from './HaveIngredient';
import { FullRecipe } from './FullRecipe';

const recipe = ['apples', 'flour', 'eggs', 'milk'];

export const Recipe = () => {
  return(
    <div>
      <h2>Recipe</h2>
      {recipe.map((e) => <HaveIngredient key={e} ing={e} />)}
      <FullRecipe recipe={recipe} />
    </div>
  )

}
~~~
<hr>

<a name="schema5"></a>

# 5 Modificamos `useIngredients.tsx` y modificamos `HaveIngredients.tsx`
- `useIngredients.tsx`
~~~tsx
import React, { useContext, useState } from 'react';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const { ingredients, addItem }= useContext(IngredientsContext)

    const hasIngredient = (ing) => ingredients.filter((e) => e.ingredient === ing).length > 0;

    return { ingredients, addItem,hasIngredient }
}


~~~
- `HaveIngredients.tsx`
~~~tsx
import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const HaveIngredient = ({ ing }) => {

  const { ingredients,hasIngredient }  = useIngredient();
  if(hasIngredient(ing))
  {
    return (
      <p style={{ color: 'green' }}>
        {' '}
        I have
        {' '}
        {ing}
      </p>
    );
  }
  return (
    <p style={{ color: 'red' }}>
      {' '}
      I dont have any
      {' '}
      {ing}
    </p>
  );
  
}
~~~
<hr>

<a name="schema6"></a>

# 6 Modificamos `FullRecipe.tsx` para dejar solo el componente y ponemos la lógica en el contexto.
- `FullRecipe.tsx` 
~~~tsx
import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const FullRecipe = ({ recipe }) => {
    const { getMissingIngredients } = useIngredient();
    const { missingIngredients, completed } = getMissingIngredients(recipe);
 
    if (completed) {
      return (<p>✅Receta completa</p>);
    }
    return (
      <p>
        ❌
        {' '}
        <b>Faltan ingredients: </b>
        {[...missingIngredients].join(', ')}
      </p>
    );
  };
~~~
- `useIngredients.tsx` 
~~~tsx
import React, { useContext, useState } from 'react';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const { ingredients, addItem }= useContext(IngredientsContext)

    const hasIngredient = (ing) => ingredients.filter((e) => e.ingredient === ing).length > 0;

    const getMissingIngredients=(recipe) => {
        const completedIngredients =  recipe.filter((ingredient)=>ingredients.map((e)=>e.ingredient)
        .includes(ingredient));

        const setRecipe = new Set(completedIngredients);
        const missingIngredients = new Set([...recipe].filter((x) => !setRecipe.has(x)));
        
        return {
            missingIngredients,
            completed: completedIngredients.length ===recipe.lengt
        }
    }

    return { ingredients, addItem,hasIngredient,getMissingIngredients }
}
~~~

# 7 Crearmos `ShoppingListManager` en `useIngredients.tsx` 
- `useIngredients.tsx` 
~~~tsx
import React, { useContext, useState } from 'react';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const { ingredients, addItem }= useContext(IngredientsContext)

    const hasIngredient = (ing) => ingredients.filter((e) => e.ingredient === ing).length > 0;

    const getMissingIngredients=(recipe) => {
        const completedIngredients =  recipe.filter((ingredient)=>ingredients.map((e)=>e.ingredient)
        .includes(ingredient));

        const setRecipe = new Set(completedIngredients);
        const missingIngredients = new Set([...recipe].filter((x) => !setRecipe.has(x)));

        return {
            missingIngredients,
            completed: completedIngredients.length ===recipe.lengt
        }
    }

    return { ingredients, addItem,hasIngredient,getMissingIngredients }
}

export const ShoppingListManager = ({children}) =>{
    const [items, setItems] = useState([]);
    const addItem = (item)=>{
       setItems([...items,item])
   }
   return(
    <IngredientsContext.Provider value={{ingredients: items,addItem}}>
        {children}
    </IngredientsContext.Provider>
   )

}
~~~
Modificamos `App.tsx`
~~~tsx
import React from 'react';
import { Recipe } from './components/Recipe';
import { ShoppingList } from './components/ShoppingList'
import { ShoppingListManager } from './lib/useIngredients';

export  const App =()=> {    
    return(

        <div>
            <h2>App Shopping list</h2>
            <ShoppingListManager>
                <ShoppingList/>
                <Recipe/>
            </ShoppingListManager>            
        </div>
    )
}
~~~

# 8 Le ponemos estilos a `App.tsx`
~~~tsx
import React from 'react';
import { Recipe } from './components/Recipe';
import { ShoppingList } from './components/ShoppingList'
import { ShoppingListManager } from './lib/useIngredients';
import styled from 'styled-components';

const Flex = styled.div`
display:flex;
align-items: flex-start;
justify-content: center;
flex-wrap: wrap;
`;

const Box = styled.div`
padding: 10px;
border: 1px solid red;
`;
export const App = () => (
    <div>
      <ShoppingListManager>
        <Flex>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2>App Shopping list</h2>
          </div>
          <Box>
            <ShoppingList />
          </Box>
          <Box>
            <Recipe />
          </Box>
        </Flex>
      </ShoppingListManager>
    </div>
  );
~~~