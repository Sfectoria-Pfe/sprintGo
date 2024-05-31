import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';


export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        height: '100vh', // Full viewport height
        display: 'flex',
        alignItems: 'center', // Vertical centering
        justifyContent: 'center', // Horizontal centering
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD 0%, #FFF 100%)'
            : 'linear-gradient(180deg, #02294F 0%, #090E10 100%)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3} sx={{ width: { xs: '100%', sm: '70%' }, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Welcome &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              SpringGo
            </Typography>
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 500 }}>
            Streamline Your Projects, Boost Productivity, and Achieve Success
          </Typography>
          <Typography variant="body1" color="text.secondary">
            With SpringGo, managing your projects has never been easier. Our comprehensive project management system offers powerful tools and features to help you plan, execute, and track your projects with efficiency and precision. From task management to team collaboration, SpringGo has everything you need to drive your projects forward and deliver results.
          </Typography>
          {/* <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                },
              }}
            >
              Start now
            </Button>
          </Stack>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography> */}
        </Stack>
      </Container>
    </Box>
  );
}