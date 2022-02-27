import React, { useContext, useState } from 'react';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const ctx = useContext(IngredientsContext)
    return ctx
}

