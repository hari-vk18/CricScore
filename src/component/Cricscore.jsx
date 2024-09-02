import React, { useEffect, useState } from 'react';
import './css/Cricscore.css';
import StripCard from './StripCard';

function Cricscore({ limit }) {
    const [match, setMatch] = useState([]);

    useEffect(() => {
        setMatch(limit);
        console.log('Match Data in Cricscore:', limit);
    }, [limit]);

    return (
        <div className="cricbuzz">

            <div className="cricbuzz__matchStrip">
                <StripCard data={match} />
            </div>
        </div>
    );
}

export default Cricscore;
