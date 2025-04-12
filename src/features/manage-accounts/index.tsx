import { ChangeEvent, useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Button,
} from "@mui/material";
import { useTheme } from '../../theme';  // Assuming custom theme is applied
import { User } from '../../types/User';
import ManageAccountsTable from './components/manage-accounts-table';
import { getAllUser } from '../../api/user.api';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const ManageAccount = () => {
    const theme = useTheme();
    const [users, setUsers] = useState<User[]>([]);
    const [tempFilters, setTempFilters] = useState({
        search: '',
        role: 'All',
        status: 'All'
    });
    const [filters, setFilters] = useState({
        search: '',
        role: 'All',
        status: 'All'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await getAllUser(); // Adjust this to your actual API call
                console.log(response)
                setUsers(response.map(user => ({
                    ...user,
                    status: user.status.toUpperCase() ,
                    role: capitalizeFirstLetter(user.role) 
                })));
            } catch (error) {
                setError('Failed to fetch users');
                console.error(error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);  

    const handleTempFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setTempFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        setFilters(tempFilters);
    };

    const filteredData = users.filter(user => {
        const searchMatch = user.username.toLowerCase().includes(filters.search.toLowerCase());
        const roleMatch = filters.role === 'All' || user.role === filters.role;
        const statusMatch = filters.status === 'All' || user.status === filters.status.toUpperCase();
        return searchMatch && roleMatch && statusMatch;
    });

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error: {error}</Box>;

    return (
        <Box sx={{ padding: 4, backgroundColor: 'transparent', border: 'none' }}>
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'flex-end',
                gap: 2,
                flexWrap: 'wrap',
            }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>What are you looking for?</Typography>
                    <TextField
                        variant="outlined"
                        name="search"
                        value={tempFilters.search}
                        onChange={handleTempFilterChange}
                        fullWidth
                        placeholder="Search for users, admins or by status"
                        InputProps={{
                            sx: {
                                color: theme.fontColor.greyWhite, // Text color inside the input
                                height: '39px', 
                                '&::placeholder': {
                                    color: theme.fontColor.greyWhite // Lighter color for placeholder text
                                }
                            }
                        }}
                        sx={{
                            background: theme.background.searchBar, // Change background color
                            color: theme.fontColor.greyWhite,
                            borderRadius: '4px',
                            '& .MuiInputBase-input': {
                                color: theme.fontColor.greyWhite, 
                                padding: '8px 14px', 
                                fontSize: '0.875rem',
                                height: '39px',
                                boxSizing: 'border-box',
                            },
                            '& label.Mui-focused': {
                                color: theme.fontColor.greyWhite, // Label color when focused
                            }
                        }}
                    />
                </Box>
                <FormControl sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Role</Typography>
                    <Select
                        name="role"
                        value={tempFilters.role}
                        onChange={handleTempFilterChange}
                        fullWidth
                        sx={{
                            background: theme.background.searchBar,
                            borderRadius: '4px',
                            color: theme.fontColor.greyWhite, // Text color
                            '& .MuiSelect-select': {
                                color: theme.fontColor.greyWhite, // Dropdown text color
                                padding: '8px 14px', 
                                fontSize: '0.875rem',
                            },
                            '& .MuiSvgIcon-root': {
                                color: theme.fontColor.greyWhite,  // Makes the dropdown arrow white
                            }
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Status</Typography>
                    <Select
                        name="status"
                        value={tempFilters.status}
                        onChange={handleTempFilterChange}
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            background: theme.background.searchBar,
                            borderRadius: '4px',
                            color: theme.fontColor.greyWhite, // Text color
                            '& .MuiSelect-select': {
                                color: theme.fontColor.greyWhite, // Dropdown text color
                                padding: '8px 14px', 
                                fontSize: '0.875rem',
                            },
                            '& .MuiSvgIcon-root': {
                                color: theme.fontColor.greyWhite,  // Makes the dropdown arrow white
                            }
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="DELETED">Deleted</MenuItem>
                        <MenuItem value="SUSPENDED">Suspended</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={applyFilters}
                    sx={{
                        height: '39px', 
                        fontWeight: 'bold'
                    }}
                >
                    SEARCH
                </Button>
            </Box>
            <ManageAccountsTable users={filteredData} />
        </Box>
    );
};

export default ManageAccount;
