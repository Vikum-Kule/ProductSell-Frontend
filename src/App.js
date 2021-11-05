import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Typography} from '@mui/material';
import './App.css';
import Create from './pages/Create'; 
import Note from './pages/Note';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import Login from './components/Login';
import Template  from './components/Template';
import Home from './pages/Home';
import ImItems from './pages/Im_Items';
import Export from './pages/Export';

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
        <Route path="/template">
        <Template>
            <Switch>
                <Route path="/template/home">
                  <Home/>
                </Route>
                <Route path="/template/im_items">
                  <ImItems/>
                </Route>
                <Route path="/template/export">
                  <Export/>
                </Route>
            </Switch>
        </Template>
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>  
  );
}

export default App;
