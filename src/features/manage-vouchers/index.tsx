import { Box, Typography, Button, MenuItem, TextField } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme';
import DownloadIcon from '@mui/icons-material/Download';
import VoucherTable from './VoucherTable';
import { Voucher } from '../../types/Response/Vouchers';
import { createVoucherAPI, editVoucherAPI, getAllVouchersAPI } from '../../api/voucher.api';
import { CreateVoucherPopup } from './CreateVoucherPopup';

export const VoucherManagement: React.FC = () => {
    const theme = useTheme();
    const [status, setStatus] = useState('Active');
    const [query, setQuery] = useState('');
    const [vouchers, setVouchers] = useState<Voucher[] | null>(null);
    const [openCreateVoucherPopup, setOpenCreateVoucherPopup] = useState(false);

    const handleOpenCreateVoucherPopup = () => setOpenCreateVoucherPopup(true);
    const handleCloseCreateVoucherPopup = () => setOpenCreateVoucherPopup(false);
    const fetchAllVoucher = async () => {
        try {
            const allVouchers = await getAllVouchersAPI();
            setVouchers(allVouchers);
        } catch (error) {
            console.error('Failed to fetch vouchers:', error);
        }
    };
    const handleSumbitCreateVoucher = async (voucher: {
        code: string;
        token: number;
        max_usage: number;
        expired_time: string;
    }) => {
        try {
            await createVoucherAPI(voucher);
            fetchAllVoucher();
        } catch (error) {
            console.error('Failed to create vouchers:', error);
        }
        handleCloseCreateVoucherPopup();
    };

    const handleSubmitEditVoucher = async (voucher: Voucher) => {
        try {
            await editVoucherAPI(voucher);
            fetchAllVoucher();
        } catch (error) {
            console.error('Failed to create vouchers:', error);
        }
        handleCloseCreateVoucherPopup();
    };

    useEffect(() => {
        fetchAllVoucher();
    }, []);

    return (
        <Box
            sx={{
                zoom: 0.95,
            }}
        >
            <Box
                sx={{
                    marginTop: '0.2rem',
                    marginBottom: '0.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                }}
            >
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Typography
                        sx={{
                            color: theme.fontColor.gray,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Pages
                    </Typography>
                </Link>
                <Typography>/</Typography>
                <Link to="/manage_vouchers" style={{ textDecoration: 'none' }}>
                    <Typography
                        sx={{
                            color: theme.fontColor.white,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Manage Voucher
                    </Typography>
                </Link>
            </Box>
            <Typography
                sx={{
                    color: theme.fontColor.white,
                }}
            >
                Manage Voucher
            </Typography>

            {/* ======================================  */}
            {/* =                                    =  */}
            {/* =          Search Section            =  */}
            {/* =                                    =  */}
            {/* ======================================  */}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                    borderRadius: 2,
                    marginTop: '1.5rem',
                }}
            >
                {/* Left section */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, marginBottom: '1rem' }}>
                    {/* Search box */}
                    <Box sx={{ marginRight: '1.5rem' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', mb: 0.5 }}>
                            What are you looking for ?
                        </Typography>
                        <TextField
                            placeholder="Search for users, admin or by status"
                            size="small"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            sx={{
                                minWidth: '23rem',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    backgroundColor: '#1e293b',
                                },
                                input: { color: 'white' },
                            }}
                        />
                    </Box>

                    {/* Status dropdown */}
                    <Box sx={{ marginRight: '1.5rem' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', mb: 0.5 }}>Status</Typography>
                        <TextField
                            select
                            size="small"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{
                                minWidth: 120,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    backgroundColor: '#1e293b',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </TextField>
                    </Box>

                    {/* Search button */}
                    <Button
                        variant="contained"
                        sx={{
                            height: 40,
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            textTransform: 'none',
                        }}
                        onClick={() => console.log('Searching...')}
                    >
                        Search
                    </Button>
                </Box>

                {/* Right section: Export */}
                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    sx={{
                        color: 'white',
                        borderColor: '#3b82f6',
                        fontSize: '0.9rem',
                        borderRadius: '8px',
                        textTransform: 'none',
                        marginRight: '50px',
                        '&:hover': {
                            backgroundColor: '#1e40af',
                            borderColor: '#3b82f6',
                        },
                    }}
                    onClick={() => console.log('Exporting...')}
                >
                    EXPORT
                </Button>
            </Box>
            <Button
                variant="contained"
                sx={{
                    height: 35,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    backgroundColor: theme.background.darkBlue,
                    marginBottom: '1rem',
                }}
                onClick={() => handleOpenCreateVoucherPopup()}
            >
                ADD NEW VOUCHER
            </Button>
            {/* ======================================  */}
            {/* =                                    =  */}
            {/* =          Table Section             =  */}
            {/* =                                    =  */}
            {/* ======================================  */}
            <VoucherTable data={vouchers} handleChangeVoucher={handleSubmitEditVoucher} />
            <CreateVoucherPopup
                open={openCreateVoucherPopup}
                onClose={handleCloseCreateVoucherPopup}
                onSubmit={handleSumbitCreateVoucher}
            />
        </Box>
    );
};
