import React, { useState, useEffect } from 'react'
import './TeamRank.css'
import { getRankings } from '../../api/api';
import { Padding } from '@mui/icons-material';

export default function TeamRank({ format }) {
    const role = 'teams'
    const [rankings, setRankings] = useState([])
    const [rowColor, setRowColor] = useState(true);

    const style = {
        fontSize: '25px',
        fontWeight: 700,
        paddingTop: '25px',
        paddingBottom: '25px',
    }

    useEffect(() => {
        getRankings(format, role)
            .then(response => {
                setRankings(response.rank.slice(0, 10))
                console.log(response.rank);
            })
            .catch(error => console.error(error));
    }, [format])
    return (
        <div className='PlayersRank'>
            <table className='table'>

                <thead className="teamhead">
                    <th style={{ width: '20px' }}>Pos</th>
                    <th style={{ width: '90px' }}>Name</th>
                    <th style={{ paddingLeft: '45px' }}>Points</th>
                    <th>Ratings</th>
                </thead>
                <tbody className="rows">
                    {
                        rankings.map((ranking, index) => {
                            return (
                                <tr className='each' key={index} style={{ backgroundColor: index % 2 === 0 ? '#F7F7F7' : '#FFFFFF' }}>
                                    <td className='rank' style={index == 0 ? { ...style } : {}}>{ranking.rank}</td>
                                    <td className='name' style={index == 0 ? { ...style } : {}}>{ranking.name}</td>
                                    <td className='point' style={index == 0 ? { ...style } : {}}>{ranking.points}</td>
                                    <td className='ratings' style={index == 0 ? { ...style } : {}}>{ranking.rating}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
