import { Box, Button, Checkbox, colors, FormControlLabel, Tab, Tabs, Typography } from '@mui/material';
import * as React from 'react';
import podcastBg from '../../assets/podcast_bg.jpg'
import AuthInputFields from './components/auth-input-fields';

type AuthTabProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: AuthTabProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ padding: 20, paddingLeft: 30, paddingRight: 30 }}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function AuthTabsForm() {
    const [value, setValue] = React.useState(0);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'row' }}>
            {/* Left Side (Image) */}

            <Box
                component="img"
                sx={{
                    flex: 1,
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    height: '100%',
                    width: '45%',
                }}
                src={podcastBg}
                alt="Podcast Background"
            />

            {/* Right Side (Form) */}
            <Box
                sx={{
                    flex: 1,
                    width: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2B2B2B',

                }}
            >
                <Typography variant="h4" sx={{
                    color: 'white',
                    fontFamily: 'IBM Plex Mono',
                    fontWeight: '600',
                    fontSize: {
                        xs: 20,
                        sm: 30,
                        md: 50,
                    }
                }} >
                    Podcasts Say What
                </Typography>

                <Box
                    sx={{
                        mx: 'auto',
                        mt: 5,
                        backgroundColor: '#1c1c1c',
                        borderRadius: 4,
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: 500,
                        padding: 0,
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', background: 'black', justifyContent: 'center' }}>
                        <Tabs value={value} onChange={handleChangeTab} aria-label="auth tabs" textColor="inherit" variant="fullWidth" sx={{ justifyContent: 'center' }} TabIndicatorProps={{ style: { backgroundColor: 'white' } }}>
                            <Tab label="LOG IN" {...a11yProps(0)} sx={{
                                color: 'white',
                                fontSize: '0.9em',
                                fontFamily: 'IBM Plex Mono',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    borderBottom: 'none'
                                },
                                ":focus": {
                                    outline: 'none'
                                }
                            }} />
                            <Tab label="REGISTRATION" {...a11yProps(1)} sx={{
                                color: 'white',
                                fontSize: '0.9em',
                                fontFamily: 'IBM Plex Mono',
                                fontWeight: '600',
                                ":focus": {
                                    outline: 'none'
                                }
                            }} />
                        </Tabs>
                    </Box>

                    {/* Login Panel */}
                    <CustomTabPanel value={value} index={0} >
                        <AuthInputFields
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                            <FormControlLabel
                                control={<Checkbox color='success' sx={{ color: 'white' }} />}
                                label={<Typography color="white" sx={{ fontSize: '0.9em', fontFamily: 'IBM Plex Mono', fontWeight: '500' }}>Remember me</Typography>} />
                            <Typography color="white" sx={{ cursor: 'pointer', fontSize: '0.9em', fontFamily: 'IBM Plex Mono', fontWeight: '500' }}>
                                Forget password?
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'black',
                                    borderRadius: 2,
                                    width: '10em',
                                    fontFamily: 'IBM Plex Mono',
                                    fontWeight: '600',
                                    ":focus": {
                                        outline: 'none'
                                    }
                                }}

                            >
                                LOGIN
                            </Button>
                        </Box>
                    </CustomTabPanel>

                    {/* Registration Panel */}
                    <CustomTabPanel value={value} index={1}>
                        <AuthInputFields
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'black',
                                    borderRadius: 2,
                                    width: '10em',
                                    fontFamily: 'IBM Plex Mono',
                                    fontWeight: '600',
                                    ":focus": {
                                        outline: 'none'
                                    }
                                }}

                            >
                                SUBMIT
                            </Button>
                        </Box>
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box >
    );
}



