import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Switch,
    TextField,
    Button,
    Grid2,
    Divider,
} from '@mui/material';
import { Link } from "react-router-dom";
import { ChargeConfig } from '../../types/configuration';
import {
    GetAllConfiguration,
    toggleModelCharge,
    updateModelCost,
} from '../../api/configuration.api';
import JumpingDotsString from '../../components/jumping-dot-string';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useTheme } from '../../theme';

const MODEL_LABELS: Record<string, string> = {
    FP: 'Full pipeline',
    LS: 'Lip Synchronization',
    STT: 'Video transcription (STT)',
    TTS: 'Voice generation (TTS)',
    TTT: 'Text translation (TTT)',
};

const ManageConfiguration: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [initialIsActive, setInitialIsActive] = useState(false);
    const [configDetails, setConfigDetails] = useState<ChargeConfig['config_details']>({});
    const [initialConfigDetails, setInitialConfigDetails] = useState<ChargeConfig['config_details']>({});
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const data = await GetAllConfiguration();
                const chargeConfig = data['model charge'];
                setIsActive(chargeConfig.is_active);
                setInitialIsActive(chargeConfig.is_active);
                setConfigDetails(chargeConfig.config_details);
                setInitialConfigDetails(chargeConfig.config_details);
            } catch (err) {
                console.error(err);
                alert('Failed to load configuration');
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (step: string, model: string, value: string) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 0) return; // ❌ không cho phép số âm
        setConfigDetails((prev) => ({
            ...prev,
            [step]: {
                ...prev[step],
                [model]: num,
            },
        }));
    };

    const handleSave = async () => {
        try {
            if (isActive !== initialIsActive) {
                await toggleModelCharge(isActive);
            }
    
            const updates: Promise<void>[] = [];
    
            for (const [pipeline, models] of Object.entries(configDetails)) {
                const originalModels = initialConfigDetails[pipeline] || {};
    
                for (const [model, cost] of Object.entries(models)) {
                    const originalCost = originalModels[model];
                    if (originalCost !== cost) {
                        updates.push(updateModelCost(pipeline, model, cost));
                    }
                }
            }
    
            if (updates.length > 0) {
                await Promise.all(updates);
            }
    
            // ✅ Gọi lại để load lại cấu hình mới
            const refreshed = await GetAllConfiguration();
            const chargeConfig = refreshed['model charge'];
            setIsActive(chargeConfig.is_active);
            setInitialIsActive(chargeConfig.is_active);
            setConfigDetails(chargeConfig.config_details);
            setInitialConfigDetails(chargeConfig.config_details);
    
            alert('Configuration saved successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to save configuration');
        }
    };

    if (loading) {
        return <JumpingDotsString text="Loading" textColor={theme.fontColor.babyBlue}
        dotColor={theme.fontColor.babyBlue}/>
    }

    return (
        
        <Box p={4}>
            <Box
                sx={{
                    marginTop: "0.2rem",
                    marginBottom: "0.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                }}
            >
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <Typography
                        sx={{
                            color: theme.fontColor.greyWhite,
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            "&:hover": {
                                textDecoration: "underline",
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Pages
                    </Typography>
                </Link>
                <Typography>/</Typography>
                <Link to="/manage_configuration" style={{ textDecoration: "none" }}>
                    <Typography
                        sx={{
                            color: theme.fontColor.white,
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            "&:hover": {
                                textDecoration: "underline",
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Manage Configuration
                    </Typography>
                </Link>
            </Box>


            {/* Configuration section */}
            <Box mt={3.5}> 
                <Box display="flex" alignItems="center" mb={3}>
                    <Typography mr={2}>
                        Enable Charge Model:
                    </Typography>
                    <Switch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        sx={{
                            '& .MuiSwitch-track': {
                            backgroundColor: isActive ? undefined : 'red',
                            },
                        }}
                    />
                </Box>

                {Object.entries(configDetails).map(([step, models]) => {
                    const modelEntries = Object.entries(models)
                    return (
                        <Box
                            key={step}
                            sx={{
                                backgroundColor: 'transparent',
                                mb: 2,
                                pl: 5,
                            }}
                        >
                            {/* 🔹 Dòng đầu tiên: tên step bên trái - ô nhập cost bên phải */}
                            <Grid2
                                container
                                alignItems="center"
                                spacing={2}
                                flexWrap="wrap"
                                >
                                <Grid2
                                    sx={{
                                    minWidth: '300px',
                                    maxWidth: '400px',
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <FiberManualRecordIcon sx={{ fontSize: 10, color: theme.palette.primary.main }} />
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={600}
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {MODEL_LABELS[step] || step}
                                        </Typography>
                                    </Box>
                                </Grid2>

                                <Grid2 sx={{ width: { xs: '100%', md: '200px' } }}>
                                    <TextField
                                    label={`Model ${modelEntries[0][0]} (tokens)`}
                                    type="number"
                                    fullWidth
                                    value={modelEntries[0][1]}
                                    variant="outlined"
                                    onChange={(e) =>
                                        handleChange(step, modelEntries[0][0], e.target.value)
                                    }
                                    InputProps={{
                                        sx: { color: 'white' },
                                    }}
                                    InputLabelProps={{
                                        sx: { color: 'white' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover .MuiInputLabel-root': {
                                            color: '#1976d2',
                                        },
                                    }}
                                    />
                                </Grid2>
                            </Grid2>

                            {/* 🔹 Các model còn lại */}
                            {modelEntries.slice(1).map(([modelName, token]) => (
                                <Grid2
                                    container
                                    spacing={2}
                                    justifyContent="flex-end"
                                    mt={1}
                                    key={modelName}
                                >
                                    <Grid2 sx={{ width: { xs: '100%', md: '200px' } }}>
                                    <TextField
                                        label={`Model ${modelName} (tokens)`}
                                        type="number"
                                        fullWidth
                                        value={token}
                                        onChange={(e) =>
                                            handleChange(step, modelName, e.target.value)
                                        }
                                        InputProps={{
                                            sx: { color: 'white' }
                                        }}
                                        InputLabelProps={{
                                            sx: { color: 'white' }
                                        }}
                                    />
                                    </Grid2>
                                </Grid2>
                            ))}

                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    );
                })}
            </Box>
            

            <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save Configuration
                </Button>
            </Box>
            
        </Box>
    );
};

export default ManageConfiguration;
