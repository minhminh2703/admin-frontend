import {
    Box,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
    createVoucherAPI,
    editVoucherAPI,
    getAllVouchersAPI,
} from '../../api/voucher.api'
import { CustomButton } from '../../components/custom-button'
import { useTheme } from '../../theme'
import { Voucher } from '../../types/voucher'
import { checkVoucherStatus } from '../../utils/check-voucher-status'
import VoucherTable from '../manage-vouchers/voucher-table'
import { CreateVoucherPopup } from './create-voucher-popup'

type VoucherStatus = 'Active' | 'Used' | 'Expired' | 'All'

export const VoucherManagement: React.FC = () => {
    const theme = useTheme()
    const [status, setStatus] = useState<VoucherStatus>('All')
    const [vouchers, setVouchers] = useState<Voucher[] | null>(null)
    const [openCreateVoucherPopup, setOpenCreateVoucherPopup] = useState(false)
    const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([])

    const handleOpenCreateVoucherPopup = () => setOpenCreateVoucherPopup(true)
    const handleCloseCreateVoucherPopup = () => setOpenCreateVoucherPopup(false)
    const fetchAllVoucher = async () => {
        try {
            const allVouchers = await getAllVouchersAPI()
            const sortedVouchers = allVouchers.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
            )

            setVouchers(sortedVouchers)
            setFilteredVouchers(sortedVouchers)
        } catch (error) {
            console.error('Failed to fetch vouchers:', error)
        }
    }
    const handleSumbitCreateVoucher = async (voucher: {
        code: string
        token: number
        max_usage: number
        expired_time: string
    }) => {
        try {
            await createVoucherAPI(voucher)
            fetchAllVoucher()
        } catch (error) {
            console.error('Failed to create vouchers:', error)
        }
        handleCloseCreateVoucherPopup()
    }

    const handleSubmitEditVoucher = async (voucher: Voucher) => {
        try {
            await editVoucherAPI(voucher)
            fetchAllVoucher()
        } catch (error) {
            console.error('Failed to create vouchers:', error)
        }
        handleCloseCreateVoucherPopup()
    }

    const filterVouchers = (keepStatus: VoucherStatus) => {
        if (!vouchers) return

        const filtered =
            keepStatus === 'All'
                ? vouchers
                : vouchers.filter(
                      (voucher) => checkVoucherStatus(voucher) === keepStatus,
                  )

        setFilteredVouchers(filtered)
    }

    useEffect(() => {
        fetchAllVoucher()
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'justify',
                alignItems: 'space-between',
                margin: 0,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                    borderRadius: 2,
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem',
                    p: 2,
                }}
            >
                {/* Left section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: 2,
                        marginBottom: 'none',
                    }}
                >
                    <Box
                        sx={{
                            marginRight: '1.5rem',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'Poppins, Sora, sans-serif',
                                fontWeight: '400',
                                fontSize: '0.8em',
                                color: theme.fontColor.greyWhite,
                            }}
                        >
                            Status
                        </Typography>
                        <Select
                            value={status}
                            size="small"
                            fullWidth
                            onChange={(e: SelectChangeEvent<VoucherStatus>) => {
                                const next = e.target.value as VoucherStatus
                                setStatus(next)
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: '#232D4D',
                                        borderRadius: 2,
                                        mt: 0.5,
                                        boxShadow: 4,
                                        '& .MuiMenuItem-root': {
                                            fontFamily:
                                                'Sora, Poppins, sans-serif',
                                            fontSize: '0.8em',
                                            color: '#F3F8FF',
                                            py: 1.2,
                                            '&:hover': {
                                                bgcolor:
                                                    'rgba(255,255,255,0.08)',
                                            },
                                            '&.Mui-selected': {
                                                fontWeight: 500,
                                                bgcolor:
                                                    'rgba(255,255,255,0.14)',
                                                '&:hover': {
                                                    bgcolor:
                                                        'rgba(255,255,255,0.18)',
                                                },
                                            },
                                        },
                                    },
                                },
                                MenuListProps: { sx: { p: 0 } },
                            }}
                            sx={{
                                bgcolor: theme.background.searchBar,
                                minWidth: '120px',
                                borderRadius: 2,
                                color: theme.fontColor.greyWhite,
                                fontFamily: 'Sora, Poppins, sans-serif',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    { border: 'none' },
                                '& .MuiSelect-select': {
                                    color: theme.fontColor.greyWhite,
                                    p: '8px 14px',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: theme.fontColor.greyWhite,
                                },
                            }}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </Select>
                    </Box>

                    {/* Search button */}
                    <CustomButton
                        text="SEARCH"
                        height="100%"
                        onClick={() => filterVouchers(status)}
                    />
                </Box>
                <CustomButton
                    text="ADD NEW VOUCHER"
                    height="100%"
                    onClick={() => handleOpenCreateVoucherPopup()}
                />
            </Box>

            {/* ======================================  */}
            {/* =                                    =  */}
            {/* =          Table Section             =  */}
            {/* =                                    =  */}
            {/* ======================================  */}
            <VoucherTable
                data={filteredVouchers}
                handleChangeVoucher={handleSubmitEditVoucher}
            />
            <CreateVoucherPopup
                open={openCreateVoucherPopup}
                onClose={handleCloseCreateVoucherPopup}
                onSubmit={handleSumbitCreateVoucher}
            />
        </Box>
    )
}
