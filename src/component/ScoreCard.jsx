import React from 'react'

function ScoreCard({ matchId, onBack }) {
    return (
        <div className='Match-details'>
            <button onClick={onBack}>Back</button>
            matchId
            {console.log("score")}</div>
    )
}

export default ScoreCard