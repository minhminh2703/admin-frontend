import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Define the valid status types
type AccountStatus = "ACTIVE" | "DELETED" | "SUSPENDED";

// Define the colors for each status type
const accountStatusColor: Record<AccountStatus, "success" | "error" | "warning"> = {
    ACTIVE: "success",
    DELETED: "error",
    SUSPENDED: "warning",
};

const data = Array.from({ length: 10 }, (_, i) => ({
    id: "US001",
    username: "minhminh_2703",
    fullname: "Minh Minh Nguyen",
    createdDate: "2024-12-25",
    role: "User",
    status: ["ACTIVE", "DELETED", "SUSPENDED"][i % 3] || "ACTIVE",
}));

const ManageAccountsTable = () => {
    return (
        <Box p={3}>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Edit</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Fullname</TableCell>
                        <TableCell>Created date</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                            </TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.fullname}</TableCell>
                            <TableCell>{row.createdDate}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>
                            <Chip
                                label={row.status}
                                color={accountStatusColor[row.status as AccountStatus]}
                                variant="outlined"
                            />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Typography fontWeight="bold">Total: 10 account(s) all pages</Typography>
                    <Pagination count={4} page={1} shape="rounded" />
                </Box>
            </TableContainer>
        </Box>
    );
};

export default ManageAccountsTable;
