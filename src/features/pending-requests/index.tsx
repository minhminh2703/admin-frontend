import React, { useState, useEffect } from "react";
import PendingRequestsTable, { PendingRequest } from "./pending-requests-table";
import { Typography, Box, Snackbar, Alert, AlertColor } from "@mui/material";

// Mock API call (same as before)
const fetchPendingRequests = (): Promise<PendingRequest[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const moreRequests: PendingRequest[] = [
                { id: 101, userId: 23, membershipPlan: "Premium", status: "PENDING" },
                { id: 102, userId: 45, membershipPlan: "Basic", status: "PENDING" },
                { id: 103, userId: 12, membershipPlan: "Enterprise", status: "PENDING" },
                { id: 104, userId: 88, membershipPlan: "Basic", status: "PENDING" },
                { id: 105, userId: 101, membershipPlan: "Premium", status: "PENDING" },
                { id: 106, userId: 6, membershipPlan: "Premium", status: "PENDING" },
                { id: 107, userId: 234, membershipPlan: "Basic", status: "PENDING" },
                { id: 108, userId: 119, membershipPlan: "Enterprise", status: "PENDING" },
                { id: 109, userId: 55, membershipPlan: "Premium", status: "PENDING" },
                { id: 110, userId: 73, membershipPlan: "Basic", status: "PENDING" },
                // --- Page 2 Data ---
                { id: 111, userId: 91, membershipPlan: "Enterprise", status: "PENDING" },
                { id: 112, userId: 142, membershipPlan: "Basic", status: "PENDING" },
                { id: 113, userId: 3, membershipPlan: "Premium", status: "PENDING" },
                { id: 114, userId: 205, membershipPlan: "Premium", status: "PENDING" },
                { id: 115, userId: 8, membershipPlan: "Basic", status: "PENDING" },
                { id: 116, userId: 401, membershipPlan: "Enterprise", status: "PENDING" },
                { id: 117, userId: 31, membershipPlan: "Basic", status: "PENDING" },
            ];
            resolve(moreRequests);
        }, 500);
    });
};

const PendingRequests = () => {
    const [requests, setRequests] = useState<PendingRequest[]>([]);

    // --- 1. State for the Snackbar ---
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: AlertColor; // 'success' | 'error' | 'info' | 'warning'
    } | null>(null);

    useEffect(() => {
        fetchPendingRequests().then(data => setRequests(data));
    }, []);

    // --- 2. Updated Action Handlers ---
    const handleApproveRequest = (requestId: number) => {
        console.log(`Approving request with ID: ${requestId}`);
        // In a real app, you'd await an API call here.
        setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
        
        // Show success snackbar
        setSnackbar({
            open: true,
            message: "Request approved successfully!",
            severity: "success"
        });
    };

    const handleRejectRequest = (requestId: number) => {
        console.log(`Rejecting request with ID: ${requestId}`);
        // In a real app, you'd await an API call here.
        setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
        
        // Show info/error snackbar
        setSnackbar({
            open: true,
            message: "Request has been rejected.",
            severity: "error" // Using 'error' for a more impactful red color
        });
    };

    // --- 3. Handler to close the Snackbar ---
    const handleCloseSnackbar = () => {
        setSnackbar(null);
    };

    return (
        <Box>
            <Typography variant="h4" align="center" sx={{ color: 'white', mb: 3, fontFamily: 'Poppins, sans-serif' }}>
                Pending Membership Requests
            </Typography>

            <PendingRequestsTable
                requests={requests}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
            />

            {/* --- 4. Snackbar Component --- */}
            {/* We only render the Snackbar if the snackbar state is not null */}
            {snackbar && (
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000} // Auto-closes after 4 seconds
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    {/* The Alert component provides the styling (color, icon) */}
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%', fontWeight: 600 }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default PendingRequests;