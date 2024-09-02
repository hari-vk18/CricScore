import React, { useState, useEffect } from 'react'
import { getMatchScore } from '../api/api'
import './css/ListCard.css'


function ListCard({ matchData }) {
    const [details, setDetails] = useState({});
    const [open, setOpen] = useState(false);

    const handleClick = (id) => {
        if (matchData.matchStarted || matchData.matchEnded) {
            setOpen(true)
        } else {
            alert("Match not Started Yet")
        }
        getMatchScore(id)
            .then((res) => {
                const detailsData = res.data;
                // const battingTeam = detailsData.tossWinner === detailsData.score[0] ? detailsData.teams[0] : detailsData.teams[1];
                // detailsData.battingTeam = battingTeam;
                console.log('Fetched Match Detail:', detailsData);
                setDetails(detailsData)
            })
            .catch((err) => alert(err))
    }
    return (
        <div className='ListCard'>
            <div className="listMatchesCards">
                <div className="listMatchesCards__top">
                    <h4>
                        {
                            matchData.matchType === "" ? "N/A"
                                : matchData.matchType
                        }
                    </h4>
                    <h4>
                        {
                            matchData.matchEnded ? "Match Ended" :
                                matchData.matchStarted ? "Match Started" : "Match Not Started"
                        }
                    </h4>
                </div>
                <div className="listMatchesCards__date">
                    <h5>
                        {new Date(matchData.dateTimeGMT).toLocaleString()}
                    </h5>
                </div>
                <div className="listMatchesCards__info">
                    <h3>
                        {matchData.teams[0]} vs {matchData.teams[1]}
                    </h3>
                </div>
                {
                    open && (
                        <div className="listMatchesCards__Scores">
                            <h4 className='Toss'>
                                Toss won by : &nbsp;
                                <span className="Toss__span">
                                    {
                                        details.tossWinner
                                    }
                                </span>
                            </h4>
                        </div>
                    )
                }
                {
                    open && (
                        <div className="listMatchesCards__Scores">
                            <h4>
                                {matchData.teams[0]} {details.score && details.score[0]
                                    ? `${details.score[0].r}/${details.score[0].w}` : ''}
                                {" vs "}
                                {matchData.teams[1]} {details.score && details.score[1]
                                    ? `${details.score[1].r}/${details.score[1].w}` : ''}
                            </h4>

                            <h4>
                                {details.matchEnded &&
                                    details.status}
                            </h4>
                        </div>
                    )
                }
                <div className="listMatchesCards__button">
                    <button onClick={() => handleClick(matchData.id)}>
                        {!open ? "See Score" : "Refresh"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListCard