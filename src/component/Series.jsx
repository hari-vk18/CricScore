import React from 'react'
import Match from './Match'

export default function Series({ key, series }) {
    return (
        <div>
            <p>
                {
                    series.seriesName
                }
            </p>
            {
                series.matches.map((match) => {
                    return <Match match={match} />
                })
            }
        </div>
    )
}
