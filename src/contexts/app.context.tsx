import { createContext, useState } from 'react'
import { getAcessTokenToLS, getRoleFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  isAdmin: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAcessTokenToLS()),
  isAdmin:Boolean(getRoleFromLS()),
  setIsAuthenticated: () => null,
  setIsAdmin:() => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [isAdmin, setIsAdmin] = useState<boolean>(initialAppContext.isAdmin)

  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated,isAdmin,setIsAdmin }}>{children}</AppContext.Provider>
}
