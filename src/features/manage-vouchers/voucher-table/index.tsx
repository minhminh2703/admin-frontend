import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    Chip,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material'
import { DateField, TimeField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../../theme'
import { Voucher } from '../../../types/voucher'
import { checkVoucherStatus } from '../../../utils/check-voucher-status'

export type VoucherStatus = 'ACTIVE' | 'EXPIRED' | 'USED'

const headerStyle = {
    color: '#ECDFCC',
    borderBottom: 'none',
    fontWeight: 600,
    fontSize: '0.8em',
    fontFamily: 'Poppins, sans-serif',
}

const cellStyle = {
    color: 'white',
    borderBottom: 'none',
    padding: '5px 20px',
    fontSize: '0.8em',
    fontFamily: 'Poppins, sans-serif',
    align: 'left',
}

const footerStyle = {
    color: '#F0EB8D',
    padding: '20px 24px 20px 24px',
    fontSize: '0.875rem',
    textAlign: 'left',
    fontWeight: 500,
    colSpan: 6,
    fontFamily: 'Poppins, sans-serif',
}

const getStatus = (voucher: Voucher): { label: string; color: string } => {
    switch (checkVoucherStatus(voucher)) {
        case 'Expired':
            return { label: 'EXPIRED', color: '#f44336' }
        case 'Used':
            return { label: 'USED', color: '#ffc107' }
        case 'Active':
        default:
            return { label: 'ACTIVE', color: '#4CAF50' }
    }
}

interface VoucherTableProps {
    data?: Voucher[] | null
    handleChangeVoucher: (voucher: Voucher) => void
}

interface RowData {
    isEdited: boolean
    rowData: Voucher | null
}

const VoucherTable: React.FC<VoucherTableProps> = ({
    data,
    handleChangeVoucher,
}) => {
    const [editRow, setEditRow] = useState<RowData>({
        isEdited: false,
        rowData: null,
    })
    const rowsPerPage = 5
    const [displayData, setDisplayData] = useState<Voucher[]>([])
    const [page, setPage] = useState<number>(1)
    const theme = useTheme()
    const editRowRef = useRef<HTMLTableRowElement | null>(null)

    // useEffect for pagination
    useEffect(() => {
        if (data) {
            const startIndex = (page - 1) * rowsPerPage
            const endIndex = page * rowsPerPage
            setDisplayData(data.slice(startIndex, endIndex))
        }
    }, [data, page])

    // useEffect for edit row
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isClickOnCheckIcon = (event.target as HTMLElement).closest(
                '[data-checkicon="true"]',
            )
            // check if the click is outside of the edited row
            if (
                editRow.isEdited &&
                editRowRef.current &&
                !editRowRef.current.contains(event.target as Node)
            ) {
                setEditRow({ isEdited: false, rowData: null })
            } else if (isClickOnCheckIcon && editRow.rowData) {
                handleChangeVoucher(editRow.rowData)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [editRow])

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log('Text copied to clipboard:', text)
                alert('Copied to clipboard!')
            })
            .catch((err) => {
                console.error('Failed to copy text:', err)
            })
    }

    const handleEditClick = (row: Voucher) => {
        setEditRow({
            isEdited: !editRow.isEdited,
            rowData: row,
        })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Voucher,
    ) => {
        if (!editRow.rowData) return

        let value: string | number = e.target.value

        if (['token', 'max_usage', 'used_count'].includes(field)) {
            const parsed = parseInt(value, 10)
            value = isNaN(parsed) ? 0 : parsed
        }

        setEditRow((prev) => ({
            ...prev,
            rowData: {
                ...prev.rowData!,
                [field]: value,
            },
        }))
    }

    const handleDateChange = (date: Date, field: keyof Voucher) => {
        setEditRow({
            ...editRow,
            rowData: {
                ...editRow.rowData!,
                [field]: date.toISOString(),
            },
        })
    }

    const textFieldInputSx = {
        color: theme.fontColor.white,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        padding: '0px',
    }
    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            padding: 0,

            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #1976d2',
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: 0,
        },
    }

    return (
        <Box sx={{ p: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: 'transparent',
                        border: '0.6px solid white',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        width: '100%',
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <Table sx={{ width: '100%', border: 'none' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headerStyle}>Edit</TableCell>
                                <TableCell sx={headerStyle}>ID</TableCell>
                                <TableCell sx={headerStyle}>
                                    Voucher Code
                                </TableCell>
                                <TableCell sx={headerStyle}>Token</TableCell>
                                <TableCell sx={headerStyle}>
                                    Max Usage
                                </TableCell>
                                <TableCell sx={headerStyle}>
                                    Used Count
                                </TableCell>
                                <TableCell sx={headerStyle}>
                                    Expired Time
                                </TableCell>
                                <TableCell sx={headerStyle}>
                                    Created At
                                </TableCell>
                                <TableCell sx={headerStyle}>
                                    Updated At
                                </TableCell>
                                <TableCell
                                    sx={{ ...headerStyle, textAlign: 'center' }}
                                >
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {displayData && (
                            <TableBody>
                                {displayData.map((row) => {
                                    const status = getStatus(row)
                                    return (
                                        <TableRow
                                            key={row.id}
                                            ref={
                                                editRow.isEdited &&
                                                editRow.rowData?.id === row.id
                                                    ? editRowRef
                                                    : null
                                            }
                                        >
                                            <TableCell
                                                sx={{
                                                    ...cellStyle,
                                                    padding: 0,
                                                    width: 50,
                                                    textAlign: 'center',
                                                    py: 1.5,
                                                }}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        handleEditClick(row)
                                                    }
                                                >
                                                    {editRow.isEdited &&
                                                    editRow.rowData?.id ===
                                                        row.id ? (
                                                        <CheckIcon
                                                            data-checkicon="true"
                                                            sx={{
                                                                color: 'white',
                                                                fontSize:
                                                                    '1.2rem',
                                                                margin: 0,
                                                            }}
                                                        />
                                                    ) : (
                                                        <EditIcon
                                                            sx={{
                                                                color: 'white',
                                                                fontSize:
                                                                    '1.2rem',
                                                                margin: 0,
                                                            }}
                                                        />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    ...cellStyle,
                                                    maxWidth: '100px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    handleCopyToClipboard(
                                                        row.id,
                                                    )
                                                }
                                            >
                                                <Tooltip title={row.id} arrow>
                                                    <span>{row.id}</span>
                                                </Tooltip>
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    ...cellStyle,
                                                    cursor: 'pointer',
                                                    maxWidth: '150px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                onClick={() => {
                                                    if (
                                                        !editRow.isEdited ||
                                                        editRow.rowData?.id !==
                                                            row.id
                                                    ) {
                                                        handleCopyToClipboard(
                                                            editRow.isEdited &&
                                                                editRow.rowData
                                                                    ?.id ===
                                                                    row.id
                                                                ? editRow
                                                                      .rowData
                                                                      ?.code
                                                                : row.code,
                                                        )
                                                    }
                                                }}
                                            >
                                                {editRow.isEdited &&
                                                editRow.rowData?.id ===
                                                    row.id ? (
                                                    <TextField
                                                        value={
                                                            editRow.rowData
                                                                ?.code
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                'code',
                                                            )
                                                        }
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.code
                                                )}
                                            </TableCell>
                                            <TableCell sx={cellStyle}>
                                                {editRow.isEdited &&
                                                editRow.rowData?.id ===
                                                    row.id ? (
                                                    <TextField
                                                        value={
                                                            editRow.rowData
                                                                ?.token
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                'token',
                                                            )
                                                        }
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.token
                                                )}
                                            </TableCell>
                                            <TableCell sx={cellStyle}>
                                                {editRow.isEdited &&
                                                editRow.rowData?.id ===
                                                    row.id ? (
                                                    <TextField
                                                        value={
                                                            editRow.rowData
                                                                ?.max_usage
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                'max_usage',
                                                            )
                                                        }
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.max_usage
                                                )}
                                            </TableCell>
                                            <TableCell sx={cellStyle}>
                                                {editRow.isEdited &&
                                                editRow.rowData?.id ===
                                                    row.id ? (
                                                    <TextField
                                                        value={
                                                            editRow.rowData
                                                                ?.used_count
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                'used_count',
                                                            )
                                                        }
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                sx: textFieldInputSx,
                                                            },
                                                        }}
                                                        sx={textFieldSx}
                                                    />
                                                ) : (
                                                    row.used_count
                                                )}
                                            </TableCell>
                                            <TableCell sx={cellStyle}>
                                                {editRow.isEdited &&
                                                editRow.rowData?.id ===
                                                    row.id ? (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            gap: 0.1,
                                                        }}
                                                    >
                                                        <DateField
                                                            value={dayjs(
                                                                editRow.rowData
                                                                    .expired_time,
                                                            )}
                                                            sx={{ margin: 0 }}
                                                            onChange={(
                                                                newDate,
                                                            ) => {
                                                                if (newDate) {
                                                                    const old =
                                                                        dayjs(
                                                                            editRow
                                                                                .rowData
                                                                                ?.expired_time,
                                                                        )
                                                                    const merged =
                                                                        old
                                                                            .year(
                                                                                newDate.year(),
                                                                            )
                                                                            .month(
                                                                                newDate.month(),
                                                                            )
                                                                            .date(
                                                                                newDate.date(),
                                                                            )
                                                                    handleDateChange(
                                                                        merged.toDate(),
                                                                        'expired_time',
                                                                    )
                                                                }
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    size: 'small',
                                                                    variant:
                                                                        'standard',
                                                                    fullWidth: true,
                                                                    sx: {
                                                                        maxWidth: 120,
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    },
                                                                    InputProps:
                                                                        {
                                                                            disableUnderline: true,
                                                                            sx: {
                                                                                color: theme
                                                                                    .fontColor
                                                                                    .white,
                                                                                fontSize:
                                                                                    '0.75rem',
                                                                                p: 0,
                                                                            },
                                                                        },
                                                                    inputProps:
                                                                        {
                                                                            sx: {
                                                                                color: theme
                                                                                    .fontColor
                                                                                    .white,
                                                                                fontSize:
                                                                                    '0.75rem',
                                                                                p: 0,
                                                                            },
                                                                        },
                                                                },
                                                            }}
                                                        />
                                                        <TimeField
                                                            value={dayjs(
                                                                editRow.rowData
                                                                    .expired_time,
                                                            )}
                                                            sx={{ margin: 0 }}
                                                            onChange={(
                                                                newTime,
                                                            ) => {
                                                                if (newTime) {
                                                                    const old =
                                                                        dayjs(
                                                                            editRow
                                                                                .rowData
                                                                                ?.expired_time,
                                                                        )
                                                                    const merged =
                                                                        old
                                                                            .hour(
                                                                                newTime.hour(),
                                                                            )
                                                                            .minute(
                                                                                newTime.minute(),
                                                                            )
                                                                            .second(
                                                                                newTime.second(),
                                                                            )
                                                                    handleDateChange(
                                                                        merged.toDate(),
                                                                        'expired_time',
                                                                    )
                                                                }
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    size: 'small',
                                                                    variant:
                                                                        'standard',
                                                                    fullWidth: true,
                                                                    sx: {
                                                                        maxWidth: 120,
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    },
                                                                    InputProps:
                                                                        {
                                                                            disableUnderline: true,
                                                                            sx: {
                                                                                color: theme
                                                                                    .fontColor
                                                                                    .white,
                                                                                fontSize:
                                                                                    '0.75rem',
                                                                                p: 0,
                                                                            },
                                                                        },
                                                                    inputProps:
                                                                        {
                                                                            sx: {
                                                                                color: theme
                                                                                    .fontColor
                                                                                    .white,
                                                                                fontSize:
                                                                                    '0.75rem',
                                                                                p: 0,
                                                                            },
                                                                        },
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <>
                                                        {dayjs(
                                                            row.expired_time,
                                                        ).format('DD/MM/YYYY')}
                                                        <br />
                                                        {dayjs(
                                                            row.expired_time,
                                                        ).format('HH:mm:ss')}
                                                    </>
                                                )}
                                            </TableCell>

                                            <TableCell sx={cellStyle}>
                                                {dayjs(row.created_at).format(
                                                    'DD/MM/YYYY',
                                                )}
                                                <br />
                                                {dayjs(row.created_at).format(
                                                    'HH:mm:ss',
                                                )}
                                            </TableCell>
                                            <TableCell sx={cellStyle}>
                                                {dayjs(row.updated_at).format(
                                                    'DD/MM/YYYY',
                                                )}
                                                <br />
                                                {dayjs(row.updated_at).format(
                                                    'HH:mm:ss',
                                                )}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    ...cellStyle,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Chip
                                                    label={status.label}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        fontSize: '1em',
                                                        height: '22px',
                                                        color: status.color,
                                                        borderColor:
                                                            status.color,
                                                        borderWidth: '1.5px',
                                                        py: '5px',
                                                        fontWeight: 600,
                                                        minWidth: '80px',
                                                        fontFamily:
                                                            'Poppins, Sora, sans-serif',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        )}
                        <TableFooter
                            sx={{
                                '& .MuiTableCell-root': {
                                    borderBottom: 'none',
                                },
                            }}
                        >
                            <TableRow>
                                <TableCell sx={footerStyle} colSpan={9}>
                                    Total: {data?.length ?? 0} voucher(s) across
                                    all pages
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </LocalizationProvider>

            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={2}
            >
                {data && (
                    <Pagination
                        count={Math.ceil((data?.length ?? 0) / rowsPerPage)}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'white',
                                backgroundColor: 'transparent',
                                borderRadius: 2,
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8em',
                                fontWeight: 600,
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: 'white',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: 'white',
                                },
                            },
                            '& .MuiPaginationItem-previousNext': {
                                color: 'white',
                            },
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

export default VoucherTable
