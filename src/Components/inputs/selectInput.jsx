import {Select, MenuItem, InputLabel} from '@mui/material';
import { Controller } from 'react-hook-form';

function InputSelect({ name, control, defaultValue, label, items }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <InputLabel id={label}>{label}</InputLabel>
          <Select {...field} labelId={label} label={label} fullWidth margin="normal">
            {items.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    />
  );
}

export default InputSelect;