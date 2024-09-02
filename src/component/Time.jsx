import React from 'react';

const Time = ({ timestamp }) => {
    // Convert the timestamp to milliseconds
    const date = new Date(timestamp);

    // Format the date to "Month Day, Year"
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <>
            {formattedDate}
        </>
    );
};


export default Time;
