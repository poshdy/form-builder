import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type FormElement, type FormElementInstance } from "../FormElements";

export type Element = { id: string } & FormElement;

interface IBuilderContext {
  updateElementProps: (id: string, element: FormElementInstance) => void;
  handleAdd: (position: number, element: FormElementInstance) => void;
  setActiveElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  handleRemove: (id: string) => void;
  elements: FormElementInstance[];
  activeElement: FormElementInstance | null;
}

export const BuilderContext = createContext<IBuilderContext | undefined>(
  undefined
);

export const BuilderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeElement, setActiveElement] =
    useState<FormElementInstance | null>(null);
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const updateElementProps = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const elementIdx = elements.findIndex((element) => element.id == id);
      newElements[elementIdx] = element;

      return newElements;
    });
  };
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
        activeElement,
        updateElementProps,
        setActiveElement,
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
