import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const FullRecipe = ({ recipe }) => {
    const { ingredients } = useIngredient();
    //const { missingIngredients, completed } = getMissingIngredients(recipe);
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
        {[...missingIngredients].join(', ')}
      </p>
    );
  };