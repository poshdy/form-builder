import React, { createContext, useContext, useState } from "react";
import { type FormElement, type FormElementInstance } from "../FormElements";


export type Element = { id: string } & FormElement;

interface IBuilderContext {
  handleAdd: (position: number, element: FormElementInstance) => void;
  handleRemove: (id: string) => void;
  elements: FormElementInstance[];
}

const BuilderContext = createContext<IBuilderContext | undefined>(undefined);

export const BuilderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const handleAdd = (position: number, element: FormElementInstance) => {
    

    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(position, 0, element);
      return newElements;
    });
  };

  const handleRemove = (id: string) => {
    setElements((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <BuilderContext.Provider
      value={{
        elements,
        handleAdd,
        handleRemove,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);

  if (!context)
    throw new Error(
      "you can't use builder context outside builder context provider"
    );

  return context;
};
