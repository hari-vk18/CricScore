import React, { useEffect, useState } from 'react'
import Series from './Series'
import Card from './Card';
import './css/International.css'

export default function International({ MatchesTypes, recentMatches }) {
    const [match, setMatch] = useState([]);
    useEffect(() => {
        const match = recentMatches.filter(item => item.matchType === MatchesTypes);
        setMatch(match);
        console.log("filtered data", match)
    }, [MatchesTypes, recentMatches])
    return (
        <div className='Type'>
            {
                match.map((match, index) =>
                (
                    match?.matchType &&
                    match?.seriesMatches?.map((data, index) => (
                        data.seriesAdWrapper && (
                            data.seriesAdWrapper?.matches?.map((match) => (

                                <Card key={index} id={match?.matchInfo?.matchId} matchOb={match} series={data.seriesAdWrapper?.seriesId} />

                            ))
                        )

                    ))
                ))

            }
        </div>
    )
}
