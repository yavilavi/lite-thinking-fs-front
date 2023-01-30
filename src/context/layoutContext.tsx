import { FC, createContext, useContext, useState, PropsWithChildren } from 'react';

export type ILayoutState = {
  pageTitle: string;
  pageHeaderAddAction: (data: any) => void;

  pageHeaderAddActionBtnText: string;
  showPageHeaderAddAction: boolean;

}

type LayoutContextProps = {
  state: ILayoutState;
  updateLayoutState: (updates: Partial<ILayoutState>) => void;
  resetLayoutState: () => void;
}

const initialLayoutContextValues: LayoutContextProps = {
  state: {
    pageTitle: "",
    pageHeaderAddActionBtnText: "Add new ",
    pageHeaderAddAction: () => {
      throw new Error("Add method not implemented")
    },
    showPageHeaderAddAction: false,
  },
  updateLayoutState: () => {
  },
  resetLayoutState: () => {
  }
};
const LayoutContext = createContext(initialLayoutContextValues);

export const LayoutContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ state, setState ] = useState<ILayoutState>(initialLayoutContextValues.state);

  const updateLayoutState = (updates: Partial<ILayoutState>) => {
    const updatedState = { ...state, ...updates } as ILayoutState;
    setState(updatedState);
  };

  const resetLayoutState = () => {
    const updatedState = { ...state, ...initialLayoutContextValues.state } as ILayoutState;
    setState(updatedState);
  }

  return <LayoutContext.Provider
    value={ {
      state,
      updateLayoutState: updateLayoutState,
      resetLayoutState: resetLayoutState
    } }
  >
    { children }
  </LayoutContext.Provider>;
};
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) throw Error('Not inside main context');
  return context;
};


