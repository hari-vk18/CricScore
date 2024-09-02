import React, { useEffect, useState } from 'react'
import { getImg, getMatchInfo2, getMatchScore1 } from '../api/api';
import Time from './Time';

export default function Match({ match }) {
    const [Match, setMatch] = useState({});
    const [Team1, setTeam1] = useState(null);
    const [Team2, setTeam2] = useState(null);
    const [Score, setScore] = useState([]);

    useEffect(() => {
        getImg(match.matchInfo?.team1.imageId)
            .then((res) => setTeam1(res))
            .catch((err) => console.log(err));
        getImg(match.matchInfo?.team2.imageId)
            .then((res) => setTeam2(res))
            .catch((err) => console.log(err));
        getMatchScore1(match.matchInfo.matchId)
            .then((res) => setScore(res.scoreCard))
            .catch((err) => console.log(err));
    }, [Match])
    useEffect(() => {
        getMatchInfo2(match.matchInfo.matchId)
            .then(response => {
                setMatch(response);
                console.log(response)
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <div className='MatchCard'>
            <p>
                {
                    Match.matchInfo?.matchDescription
                },
                {
                    Match.matchInfo?.venue.city
                },
                {
                    <Time timestamp={Match.matchInfo?.matchStartTimestamp} />
                },
                {
                    match.matchInfo.seriesName
                }
            </p>
            <div>
                <span>{
                    Team1 && <img src={Team1} alt="Team" />
                }</span>
                {
                    match.matchInfo?.team1.teamName
                }
                {
                    // Score[0]?.scoreDetails.overs
                }
            </div>
            <div>
                {
                    Team2 && <img src={Team2} alt="Team" />
                }
                {
                    match.matchInfo?.team2.teamName
                }
            </div>
        </div>
    )
}
