import React, { useContext, useState } from 'react';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const { ingredients, addItem }= useContext(IngredientsContext)

    const hasIngredient = (ing) => ingredients.filter((e) => e.ingredient === ing).length > 0;

    return { ingredients, addItem,hasIngredient }
}

