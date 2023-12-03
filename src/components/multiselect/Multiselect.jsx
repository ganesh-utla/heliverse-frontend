import React from "react";
import { InputLabel, OutlinedInput, MenuItem, Select, FormControl, Stack, Chip } from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";

const MultiSelect = ({ options, selectedOptions, setSelectedOptions, title }) => {
  
  return (
    <FormControl className="w-full">
      <InputLabel>{title}</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.target.value)}
        input={<OutlinedInput label={title} />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedOptions(
                    selectedOptions.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <Cancel
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {options.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
            {selectedOptions.includes(name) ? <Check color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;