import React from "react";
import { TextField, Typography } from "@mui/material";
import { useTheme } from "../../../../theme"; 

interface LabeledInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    type?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
    label,
    name,
    value,
    onChange,
    readOnly = false,
    type = "text",
}) => {
    const theme = useTheme();
    return (
        <>
            <Typography sx={{ color: "white", fontSize: "1rem", mb: 0.5 }}>{label}</Typography>
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
                type={type}
                InputProps={{
                    readOnly,
                }}
                sx={{
                    input: { 
                        color: "white",
                        backgroundColor: readOnly ? theme.background.searchBar : "transparent", 
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: "white" },
                        '&:hover fieldset': { borderColor: "white" },
                        '&.Mui-focused fieldset': { borderColor: "white" },
                    },
                }}
            />
        </>
    );
};

export default LabeledInput;
