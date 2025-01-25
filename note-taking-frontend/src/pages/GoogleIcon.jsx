import React from 'react';
import { SvgIcon } from '@mui/material';

const GradientGoogleIcon = () => {
    return (
        <SvgIcon viewBox="0 0 48 48" sx={{ width: '40px', height: '40px' }}>
            <defs>
                <linearGradient id="google-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="20%" style={{ stopColor: '#FB8C00', stopOpacity: 1 }} /> {/* Orange */}
                    <stop offset="50%" style={{ stopColor: '#F4B400', stopOpacity: 1 }} /> {/* Yellow */}
                    <stop offset="100%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} /> {/* Blue */}
                </linearGradient>
            </defs>
            <path 
                fill="url(#google-gradient)" 
                d="M23.49 12.27c-1.13-.01-2.25-.09-3.35-.26-1.62-.25-3.21-.79-4.61-1.56-2.39-1.17-4.38-3.07-5.66-5.44C9.05 3.88 8 2.59 8 1c0-.63.22-1.19.58-1.65C9.06-.03 10 .01 10 .01c1 .01 2 .01 3 .01h7c5 0 9 .02 9 .02s-.03 2-9 .02z" 
            />
        </SvgIcon>
    );
};

export default GradientGoogleIcon;
