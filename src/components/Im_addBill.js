import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

function Im_addBill({setOpenForm}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={11} sx={12}>
                <Typography mt={1} variant="h6"> Add Import Bill </Typography>
            </Grid>
            <Grid item xs={12} sm={1} sx={12}>
                <Tooltip title="Close"> 
                   <IconButton
                   onClick={()=>{setOpenForm(false)}} 
                   aria-label="close" 
                   size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                </Grid>
        </Grid>
    )
}

export default Im_addBill
