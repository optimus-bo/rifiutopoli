import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

const emptyValue = '';

type NumberInputProps = {
  label: string;
  value: number | null;
  onChange: (newValue: number | null) => void;
};

export default function NumberInput({ label, value, onChange }: NumberInputProps) {
  const [stringValue, setStringValue] = useState<string>(value !== null ? value.toString() : emptyValue);

  function setNewValue(newValue: number | null) {
    if (newValue === null) {
      setStringValue(emptyValue);
      onChange(null);
    } else {
      setStringValue(newValue.toString());
      onChange(newValue);
    }
  }

  function updateValue(event: ChangeEvent<HTMLInputElement>) {
    const numberValue = parseFloat(event.target.value);
    if (!isNaN(numberValue)) {
      setNewValue(numberValue);
    } else {
      setNewValue(null);
    }
  }

  function increaseValue() {
    if (value === null) {
      setNewValue(1);
    } else {
      setNewValue(value + 1);
    }
  }

  function decreaseValue() {
    // non permette valori negativi
    if (value === null || value <= 0) {
      setNewValue(0);
    } else {
      setNewValue(value - 1);
    }
  }

  useEffect(() => {
    if (value === null) {
      setStringValue(emptyValue);
    }
    if (value !== null && value.toString() !== stringValue) {
      setStringValue(value.toString());
    }
  }, [value]);

  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      value={stringValue}
      onChange={updateValue}
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*', // This helps with iOS to show the numeric keyboard
        type: 'tel', // This is to ensure numeric keypad on older devices
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={decreaseValue}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={increaseValue}>
              <AddCircleOutlineIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
