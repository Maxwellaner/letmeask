import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from "./pages/HomePage";
import { NewRoomPage } from "./pages/NewRoomPage";
import { RoomPage } from './pages/RoomPage';
import { AdminRoomPage } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ToogleThemeProvider } from './contexts/ToogleThemeContext';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import { usePersistedState } from './hooks/usePersistedState';

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toogleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
    console.log(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/rooms/new" component={NewRoomPage} />
            <ToogleThemeProvider toogleTheme={toogleTheme} >
              <Route path="/rooms/:id" component={RoomPage} />
              <Route path="/admin/rooms/:id" component={AdminRoomPage} />
            </ToogleThemeProvider>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
