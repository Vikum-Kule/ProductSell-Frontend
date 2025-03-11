import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function CustomerDataComponent({ customer }) {
  console.log(customer);
  const first = Array.from(customer.customerName)[0];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {first}
          </Avatar>
        }
        title={customer.customerName}
        subheader={customer.email}
      />
    </Card>
  );
}
