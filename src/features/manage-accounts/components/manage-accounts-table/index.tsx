import React, { useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Chip,
    Pagination,
    TableFooter,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ListUser, User } from "../../../../types/User";

// Define the valid status types
export type AccountStatus = "ACTIVE" | "DELETED" | "SUSPENDED";

const brightColors: Record<AccountStatus, string> = {
    ACTIVE: "#4caf50",  // Less bright green
    DELETED: "#f44336",  // Less bright red
    SUSPENDED: "#ffc107"  // Less bright yellow
};

const headerStyle = {
    color: 'white',
    borderBottom: "none",
    fontWeight: 'bold',
    padding: '20px 30px 6px 30px', 
    fontSize: '1rem'
};

const cellStyle = {
    color: 'white',
    borderBottom: "none",
    padding: '6px 30px',  // Reduced padding for cells
    fontSize: '0.875rem',  // Smaller font size for cells
    align: 'left'
};

const footerStyle = {
    color: 'white',
    padding: '10px 24px 20px 24px', // Adjusted padding for footer
    fontSize: '0.875rem',
    textAlign: 'left',
    fontWeight: 'bold',
    colSpan: 6  // Adjust this based on the number of columns in your table
};

interface ManageAccountsTableProps extends ListUser {
    onEdit: (userId: number) => void;
}

const ManageAccountsTable: React.FC<ManageAccountsTableProps> = ({ users, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const accountsPerPage = 8;

    // Calculate the number of pages
    const pageCount = Math.ceil(users.length / accountsPerPage);

    // Get current accounts to display
    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    const currentAccounts = users.slice(indexOfFirstAccount, indexOfLastAccount);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <Box p={3} sx={{ backgroundColor: "transparent", border: "none" }}>
            <TableContainer 
                component={Paper} 
                sx={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: '100%',
                }}
            >
                <Table sx={{ width: '100%', border: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerStyle}>Edit</TableCell>
                            <TableCell sx={headerStyle}>ID</TableCell>
                            <TableCell sx={headerStyle}>Username</TableCell>
                            <TableCell sx={headerStyle}>Fullname</TableCell>
                            <TableCell sx={headerStyle}>Created date</TableCell>
                            <TableCell sx={headerStyle}>Role</TableCell>
                            <TableCell sx={headerStyle}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentAccounts.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell sx={cellStyle}>
                                    <IconButton sx={{ color: 'white' }} onClick={() => onEdit(user.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell sx={cellStyle}>{user.id}</TableCell>
                                <TableCell sx={cellStyle}>{user.username}</TableCell>
                                <TableCell sx={cellStyle}>{user.first_name + " " + user.last_name}</TableCell>
                                <TableCell sx={cellStyle}>{user.created_at}</TableCell>
                                <TableCell sx={cellStyle}>{user.role}</TableCell>
                                <TableCell sx={cellStyle}>
                                    <Chip
                                        label={user.status}
                                        sx={{
                                            color: brightColors[user.status as AccountStatus],  // Bright text color
                                            borderColor: brightColors[user.status as AccountStatus],  // Bright border color
                                            borderWidth: '2px',  // Thicker border
                                            fontWeight: 'bold',  // Bold text
                                        }}
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell sx={footerStyle} colSpan={7}>Total: {users.length} account(s) across all pages</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" alignItems="center" p={2} sx={{ borderBottom: "none" }}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'white',
                            }
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default ManageAccountsTable;
