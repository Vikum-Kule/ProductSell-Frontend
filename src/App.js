import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/private-theming";
import Login from "./components/Login";
import Template from "./components/Template";
import Home from "./pages/Home";
import ImItems from "./pages/Imports/ImportItem/Im_Items";
import Im_Categories from "./pages/Imports/ImportCategory/Im_Categories";
import Im_Bill from "./pages/Imports/ImportBill/Im_Bill";
import Ex_Products from "./pages/Ex_Products";
import Im_Stockupdates from "./pages/Imports/ImportStockIntake/Im_stockupdates";
import CategoryView from "./pages/Imports/ImportCategory/CategoryView";
import ImportItemView from "./pages/Imports/ImportItem/Im_ItemView";
import StockUpdateView from "./pages/Imports/ImportStockIntake/StockUpdateView";
import ImportBillView from "./pages/Imports/ImportBill/Im_BillView";
import Im_ItemEdit from "./pages/Imports/ImportItem/Im_ItemEdit";
import Ex_Category from "./pages/Exports/ExportCategory/Ex_Categories";
import Ex_CategoryView from "./pages/Exports/ExportCategory/Ex_CategoyView";
import Ex_Items from "./pages/Exports/ExportItem/Ex_Items";

const theme = createTheme({});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/template">
            <Template>
              <Switch>
                <Route path="/template/home">
                  <Home />
                </Route>
                <Route path="/template/im_items">
                  <ImItems />
                </Route>
                <Route path="/template/im_categories">
                  <Im_Categories />
                </Route>
                <Route path="/template/im_bills">
                  <Im_Bill />
                </Route>
                <Route path="/template/im_stockupdates">
                  <Im_Stockupdates />
                </Route>
                <Route path="/template/ex_products">
                  <Ex_Products />
                </Route>
                <Route path="/template/im_item_view/:importId">
                  <ImportItemView />
                </Route>
                <Route path="/template/im_category_view/:cat_id">
                  <CategoryView />
                </Route>
                <Route path="/template/stock_update_view/:intakeId">
                  <StockUpdateView />
                </Route>
                <Route path="/template/im_bill_view/:billId">
                  <ImportBillView />
                </Route>
                <Route path="/template/im_item_edit/:importId">
                  <Im_ItemEdit />
                </Route>
                <Route path="/template/ex_categories">
                  <Ex_Category />
                </Route>
                <Route path="/template/ex_category_view/:cat_id">
                  <Ex_CategoryView />
                </Route>
                <Route path="/template/ex_items">
                  <Ex_Items />
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
