import React from 'react'
import Series from './Series'

export default function International({ MatchesTypes }) {
    return (
        <div>
            <p>InterNational</p>
            {
                MatchesTypes.map((match, index) =>
                (
                    match.seriesAdWrapper && (
                        <Series key={index} series={match.seriesAdWrapper} />
                    )
                ))

            }
        </div>
    )
}
