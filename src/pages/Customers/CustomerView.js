import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CustomerDataView from "../../components/CustomerDataView";

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

  const customerData = async () => {
    
  }

  return (
    <Paper className={classes.container} elevation={8}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={10} sx={12}><CustomerDataView /></Grid>
      </Grid>
    </Paper>
  );
}

export default CustomerView;
