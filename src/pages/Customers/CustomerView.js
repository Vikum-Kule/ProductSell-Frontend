import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CustomerDataView from "../../components/CustomerDataView";
import { getCustomerById } from "../../services/Customer";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  categoryContainer: {
    padding: "10px",
  },
});

function CustomerView({ history }) {
  const classes = useStyles();
  const { customerId } = useParams();

  const [customer, setCustomer] = useState(null);
  const [customerError, setCustomerError] = useState("");

  useEffect(async () => {
    fetchCustomerData();
    }, []);

  const fetchCustomerData = async () => {
    let result = await getCustomerById(customerId);
    console.log(result);
    if(result !== "Something went wrong..."){
        setCustomer(result)
    }else{
        setCustomerError("Unable to fetch customer data!..")
    }
  }

  return (
    <Paper className={classes.container} elevation={8}>
      <Grid container spacing={5}>
        {customerError ? (<Grid item>
          <Typography
            align="left"
            variant="caption"
            style={{
              color: "red",
              fontSize: 16,
              fontWeight: "bold",
              paddingLeft: 40,
            }}
          >
            {customerError}
          </Typography>
        </Grid>) :<Grid item xs={12} sm={10} sx={12}>{customer ? <CustomerDataView customer={customer} /> : null}</Grid>}
      </Grid>
    </Paper>
  );
}

export default CustomerView;
