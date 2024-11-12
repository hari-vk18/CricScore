import React, { useEffect, useState } from 'react'
import Series from './Series'
import Card from './Card';
import './css/International.css'
import ScoreCard from './ScoreCard';

export default function International({ MatchesTypes, recentMatches }) {
    const [match, setMatch] = useState([]);
    const [selecterMatchId, setSelecterMatchId] = useState(null);
    useEffect(() => {
        const match = recentMatches.filter(item => item.matchType === MatchesTypes);
        setMatch(match);
        console.log("filtered data", match)
    }, [MatchesTypes, recentMatches])

    const handleCardClick = (matchId) => {
        setSelecterMatchId(matchId);
    }

    const handleOnBack = () => {
        setSelecterMatchId(null);
    }
    return (
        <div className='Type'>
            {
                selecterMatchId ?
                    (<ScoreCard matchId={selecterMatchId} onBack={handleOnBack} />)
                    : (
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
                                            onClick={handleCardClick}
                                        />
                                    )
                                )

                            ))
                        ))
                    )
            }
        </div>
    )
}
