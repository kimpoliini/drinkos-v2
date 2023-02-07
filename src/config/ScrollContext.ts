import React, { createContext } from "react";

export const ScrollContext = createContext({
    value: 0,
    setValue: (value: number) => {}
})