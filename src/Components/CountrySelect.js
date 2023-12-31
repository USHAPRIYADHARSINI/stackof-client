import { FormLabel } from '@mui/material'
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelect({setNewUser, newUser}) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  return (
    <div>
    <FormLabel htmlFor='loc'>Location</FormLabel>
    <Select options={options} value={value} onChange={changeHandler}/>
    </div>
  )
}

export default CountrySelect