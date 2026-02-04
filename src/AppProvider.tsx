import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

// Provide a "global" context that all components can share

// Create the context with an initial empty value
const AppContext = createContext<any>(null);

// A component to wrap all other components in 
export function AppProvider({ children }: { children: ReactNode }) {
  // a state variable that we will share in our context to other components
  // REFACTOR SOON: Keep the initial values in a separate json or js file?
  const [user, setUser] = useState({
  });

  async function getLogin(){
    const response = await fetch("/api/login")
    const result = await response.json()

    if(response.ok && result.email){
        setUser(result)
    }

  }

  // Använder useEffect för att se till att applikationen 
  // alltid kör getLogin() när react mountar applikationen.
  useEffect(() => {
    getLogin()
  }, []) 

  // return the Context with the children inside
  return <AppContext value={{ user, setUser }}>
    {children}
  </AppContext>
}

export function useAppContext() {
  return useContext(AppContext);
}