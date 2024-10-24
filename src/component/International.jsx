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
                            data.seriesAdWrapper?.matches?.length > 0 && (
                                <Card
                                    key={data.seriesAdWrapper.matches[0]?.matchInfo?.matchId}
                                    id={data.seriesAdWrapper.matches[0]?.matchInfo?.matchId}
                                    matchOb={data.seriesAdWrapper.matches[0]}
                                    series={data.seriesAdWrapper?.seriesId}
                                />
                            )
                        )

                    ))
                ))

            }
        </div>
    )
}
