import React from "react";
import { Typography, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTheme } from "../../../../theme";

interface LabeledFormControlProps {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: (e: SelectChangeEvent<string>) => void;
}

const LabeledFormControl: React.FC<LabeledFormControlProps> = ({
    label,
    name,
    value,
    options,
    onChange
}) => {
    const theme = useTheme();

    return (
        <>
            <Typography sx={{ color: "white", fontSize: "1rem", mb: 0.5 }}>
                {label}
            </Typography>
            <FormControl fullWidth>
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    sx={{
                        color: "white",
                        fontWeight: 'bold',
                        '& .MuiSelect-select': {
                            fontWeight: 'bold',
                            color: 'white',
                        },
                        '& .MuiSelect-icon': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                    }}
                >
                    {options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default LabeledFormControl;
