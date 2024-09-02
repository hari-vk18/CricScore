import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getRankings } from '../../api/api'
import { Tune } from '@mui/icons-material';
import './PlayersRank.css'

export default function PlayersRank({ format }) {
    const role = 'batsmen'
    const [rankings, setRankings] = useState([])

    const style = {
        fontSize: '25px',
        fontWeight: 700,
        paddingTop: '25px',
        paddingBottom: '25px',
    }

    useEffect(() => {
        getRankings(format, role)
            .then(response => {
                setRankings(response.rank)
                console.log(response.rank);
            })
            .catch(error => console.error(error));
    }, [format])
    return (
        <div className='PlayersRank'>
            <table className='table'>

                <thead className="head">
                    <th className='pos'>Pos</th>
                    <th>Team</th>
                    <th className='hname'>Name</th>
                    <th>Points</th>
                </thead>
                <tbody className="rows">
                    {
                        rankings.map((ranking, index) => {
                            return (
                                <tr className='each' key={index} style={{ backgroundColor: index % 2 === 0 ? '#F7F7F7' : '#FFFFFF' }}>
                                    <td className='playerrank' style={index == 0 ? { ...style } : {}}>{ranking.rank.padStart(2, '0')}</td>
                                    <td className='playerteam' style={index == 0 ? { ...style } : {}}>{index == 0
                                        ? ranking.country.substring(0, 3).toUpperCase()
                                        : ranking.country.toUpperCase()}</td>
                                    <td className='playername' style={index == 0 ? { ...style } : {}}>{ranking.name}</td>
                                    <td className='playerpoint' style={index == 0 ? { ...style } : {}}>{ranking.points}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
