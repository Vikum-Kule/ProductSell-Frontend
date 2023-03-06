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
import Im_Categories from './pages/Im_Categories';
import Im_Bill from './pages/Im_Bill';
import Ex_Products from './pages/Ex_Products';
import Im_Stockupdates from './pages/Im_stockupdates';
import CategoryView from './pages/CategoryView';
import ImportItemView from './pages/Im_ItemView';
import StockUpdateView from './pages/StockUpdateView';

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
                <Route path="/template/im_categories">
                  <Im_Categories/>
                </Route>
                <Route path="/template/im_bills">
                  <Im_Bill/>
                </Route>
                <Route path="/template/im_stockupdates">
                  <Im_Stockupdates/>
                </Route>
                <Route path="/template/ex_products">
                  <Ex_Products/>
                </Route>
                <Route path="/template/im_item_view:importId">
                  <ImportItemView/>
                </Route>
                <Route path="/template/im_category_view">
                  <CategoryView/>
                </Route>
                <Route path="/template/stock_update_view/:intakeId">
                  <StockUpdateView/>
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
