import React, { useEffect, useState } from 'react'
import { getMatchInfo1 } from '../api/api';
import International from './International';
import Leagues from './Leagues'
import Series from './Series';
import Women from './Women';
import Domestics from './Domestics';

export default function MatchType() {
    const [MatchType, setMatchType] = useState([]);

    useEffect(() => {
        getMatchInfo1()
            .then(response => {
                setMatchType(response.typeMatches);
            })
            .catch((err) => console.log(err));
    }, [])
    console.log(MatchType);
    return (

        <div>
            {MatchType.map((types) => {
                if (types.matchType === "International") {
                    return <International MatchesTypes={types.seriesMatches} />
                } else if (types.matchType === "League") {
                    return <Leagues MatchesTypes={types.seriesMatches} />
                } else if (types.matchType === "Domestic") {
                    return <Domestics MatchesTypes={types.seriesMatches} />
                } else if (types.matchType === "Women") {
                    return <Women MatchesTypes={types.seriesMatches} />
                }
            })}
        </div>
    )
}
