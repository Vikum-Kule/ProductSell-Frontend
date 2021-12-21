import { Alert } from '@mui/material'
import React from 'react'

export default function FormAlert({type, message}) {
    return (
        <div>
            <Alert severity={type}>{message}</Alert>
        </div>
    )
}
