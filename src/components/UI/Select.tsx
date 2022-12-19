import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelect {
  value: string;
  options: IOption[];
  handleChange: (event: SelectChangeEvent) => void;
}

export interface IOption {
  value: string;
  title: string;
}

const BasicSelect: React.FC<ISelect> = ({ options, handleChange, value }) => {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Filter"
          onChange={handleChange}
        >
          {options.map(({ value, title }) => (
            <MenuItem key={value} value={value}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
