import TextField from '@mui/material/TextField';

function Input({ name, label, register, message, type, step}) {
  return (
    <TextField
     type={type}
      step={type === "number" ? step : ""}
      id={name}
      label={label}
      variant="outlined"
      {...register}
      helperText={message}
    />
  );
}

export default Input;