import React from "react";

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const PageNotFound = () => {
    return (
        <Box p={5}>
            <Typography variant='h5' gutterBottom>Page Not Found</Typography>
            <Typography variant='body1'>Sorry, we could not find what your looking for. Please try again.</Typography>
        </Box>
    );
}

export default PageNotFound;