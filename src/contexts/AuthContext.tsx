import { createContext, useEffect, useState, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  authContext: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [authContext, setAuthContext] = useState<User>();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) throw new Error('Missing information from Google Account.');

      setAuthContext({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
      }
    });

    return () => {
      unSubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const authResult = await auth.signInWithPopup(provider);

    if (authResult.user) {
      const { displayName, photoURL, uid } = authResult.user;

      if (!displayName || !photoURL) throw new Error('Missing information from Google Account.');

      setAuthContext({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ authContext, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}