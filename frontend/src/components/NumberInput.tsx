import { TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

const emptyValue = '';

type NumberInputProps = {
  label: string;
  value: number | null;
  onChange: (newValue: number | null) => void;
};

export default function NumberInput({ label, value, onChange }: NumberInputProps) {
  const [stringValue, setStringValue] = useState<string>(value !== null ? value.toString() : emptyValue);

  function updateValue(event: ChangeEvent<HTMLInputElement>) {
    const numberValue = parseFloat(event.target.value);
    if (!isNaN(numberValue)) {
      setStringValue(numberValue.toString());
      onChange(numberValue);
    } else {
      setStringValue(emptyValue);
      onChange(null);
    }
  }

  useEffect(() => {
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
        // inputMode: 'decimal', // Use 'decimal' for decimal input
        pattern: '[0-9]*', // This helps with iOS to show the numeric keyboard
        type: 'tel', // This is to ensure numeric keypad on older devices
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
        },
      }}
    />
  );
}
