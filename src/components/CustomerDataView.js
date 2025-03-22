import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grade } from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";
import InputField from "../FormComponents/InputField";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function CustomerDataView({ customer }) {
  console.log(customer);
  const first = Array.from(customer.customerName)[0];

  return (
    <Card elevation={3} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="customer">
            {first}
          </Avatar>
        }
        title={customer.customerName}
        subheader={customer.email}
      />
      <Divider />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <InputField
              isdisabled={true}
              name="_phone"
              value={customer.phone}
              type="text"
              label="Phone Number"
            />
          </Grid>
          <Grid item>
            <InputField
              isdisabled={true}
              name="_address"
              value={customer.address}
              type="text"
              label="Address"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
