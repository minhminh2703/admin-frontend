// StatusCard.tsx
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HelpIcon from '@mui/icons-material/Help';

export interface StatusCardProps {
  status: string;   
  count: number;   
}

const StatusCard: React.FC<StatusCardProps> = ({ status, count }) => {
  const theme = useTheme();

  const normalized = status.trim().toLowerCase();

  const { Icon, bg, fg } = (() => {
    switch (normalized) {
      case 'completed':
      case 'succeeded':
        return { Icon: CheckCircleIcon, bg: '#d7e6c3', fg: '#2e7d32' };
      case 'failed':
        return { Icon: CancelIcon, bg: '#FFCAD4', fg: '#c62828' };
      case 'all':
      case 'count':
        return { Icon: HourglassTopIcon, bg: '#B7E0FF', fg: '#1B3C73' };
      default:
        return { Icon: HelpIcon, bg: theme.palette.grey[200], fg: theme.palette.grey[600] };
    }
  })();

  /* ----- layout --------------------------------------------------------- */
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      borderRadius: 3,
      bgcolor: bg,
      boxShadow: 3,
      p: 2
    }}>
      <Box sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        bgcolor: fg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon sx={{ fontSize: 32, color: '#fff' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.7 }}>
        <Typography variant="subtitle2" sx={{
          fontWeight: 700,
          color: fg,
          textTransform: 'uppercase',
          letterSpacing: 1,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '1em',
          fontFamily: 'Sora, sans-serif',
        }}>
          {status}
        </Typography>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '2em',
          fontFamily: 'Poppins, Sora, sans-serif',
          color: theme.palette.text.primary,
        }}>
          {count}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusCard;