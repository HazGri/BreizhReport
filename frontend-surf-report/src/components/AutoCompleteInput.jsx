import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const AutoCompleteInput = ({
  label,
  value,
  inputValue,
  onInputChange,
  onChange,
  options,
  loading,
}) => {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={options}
      value={value}
      inputValue={inputValue}
      loading={loading}
      onInputChange={onInputChange}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoCompleteInput;
