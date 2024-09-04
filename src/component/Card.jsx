import React, { useEffect, useState } from 'react'
import { getMatchScore1, getSeriesInfo } from '../api/api'
import LocationIcon from './Location';
import './css/Card.css'
import TeamImg from './TeamImg';


export default function Card({ id, matchOb, key }) {
    const [matchData, setMatchData] = useState({})
    const [series, setSeries] = useState({})
    const [matchStatus, setMatchStatus] = useState("complete")
    useEffect(() => {
        getMatchScore1(id)
            .then((match) => {
                console.log('from card', match, matchOb, key)
                setMatchData(match)
            })
            .catch((err) => console.log('Error...', err))
        // getSeriesInfo(seriesId)
        //     .then((series) => {
        //         console.log('Series...', series)
        //         setSeries(series)
        //     })
    }, [])

    if (!matchData) {
        return <div>Loading...</div>
    }
    return (
        <div className='Card'>
            <p>
                {matchData?.matchHeader?.state.toUpperCase()}
                <span style={{ fontSize: '14px', color: 'black' }}> &nbsp; &#8226; &nbsp; </span>
                {matchData?.matchHeader?.seriesName}
            </p>
            <h4>
                {matchData?.matchHeader?.matchDescription}
                {/* <Location width={256} height={256} /> */}
                <LocationIcon width={10} height={50} />
                {matchOb.matchInfo.venueInfo.ground}
            </h4>

            {/* <div className='scoreCon'>
                {
                    matchData?.scoreCard?.map((team, index) => (
                        <div className='Score'>
                            <h5><TeamImg imgId={matchOb?.matchInfo?.[`team${(index + 1) % 2 == 0 ? 2 : 1}`]?.imageId} />
                                <span>{team.batTeamDetails.batTeamShortName}</span></h5>
                            <h5>{team.scoreDetails.runs}/{team.scoreDetails.wickets}
                                <span>({team.scoreDetails.overs})</span>
                            </h5>
                        </div>
                    ))
                }
            </div> */}

            <div className='scoreCon'>
                <div className='Score'>{
                    matchData?.scoreCard && matchData?.scoreCard[0] ?
                        (
                            <>
                                <h5><TeamImg imgId={matchOb?.matchInfo?.team1?.imageId} />
                                    <span>{matchData?.scoreCard[0]?.batTeamDetails?.batTeamShortName}</span></h5>
                                <h5>{matchData?.scoreCard[0]?.scoreDetails?.runs}/{matchData?.scoreCard[0]?.scoreDetails?.wickets}
                                    <span>({matchData?.scoreCard[0]?.scoreDetails?.overs})</span>
                                </h5>
                            </>)
                        :
                        <>
                            <h5><TeamImg imgId={matchOb?.matchInfo?.team1?.imageId} />
                                <span>{matchOb?.matchInfo?.team1?.teamSName}</span></h5>
                            <h5>
                                <span>Yet to bat</span>
                            </h5>
                        </>
                }

                </div>
                <div className='Score'>{
                    matchData?.scoreCard && matchData?.scoreCard[1] ?
                        (
                            <>
                                <h5><TeamImg imgId={matchOb?.matchInfo?.team2?.imageId} />
                                    <span>{matchOb?.matchInfo?.team2?.teamSName}</span></h5>
                                <h5>{matchData?.scoreCard[1]?.scoreDetails?.runs}/{matchData?.scoreCard[1]?.scoreDetails?.wickets}
                                    <span>({matchData?.scoreCard[1]?.scoreDetails?.overs})</span>
                                </h5>
                            </>)
                        :
                        <>
                            <h5><TeamImg imgId={matchOb?.matchInfo?.team2?.imageId} />
                                <span>{matchOb?.matchInfo?.team2?.teamSName}</span></h5>
                            <h5>
                                <span>Yet to bat</span>
                            </h5>
                        </>
                }

                </div>
            </div>
            <div className='status'>
                <h4>
                    {matchData.status}
                </h4>
            </div>

        </div>
    )
}
