import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Typography} from '@mui/material';
import './App.css';
import Create from './pages/Create'; 
import Note from './pages/Note';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import Login from './components/Login';

const theme = createTheme({

})


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
        <Login/>
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>  
  );
}

export default App;
