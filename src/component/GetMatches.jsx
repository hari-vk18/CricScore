import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import Cricscore from './Cricscore'
import { Link } from 'react-router-dom';
import { getLiveMatches, getMatchInfo, getMatchInfo1 } from '../api/api'
import ListCard from './ListCard';
import './css/ListCard.css'
import Skeleton from './Skeleton'

function GetMatches() {
    const [matches, setMatches] = useState([])
    const [limit, setLimit] = useState([]);
    const [search, setSearch] = useState("");
    // const [loading, setLoading] = useState(true);
    const matchType = matches.filter((match) => {
        return (
            (match.matchType && match.matchType.toLowerCase().includes(search.toLowerCase())) ||
            (match.teams && match.teams[0] && match.teams[0].toLowerCase().includes(search.toLowerCase())) ||
            (match.teams && match.teams[1] && match.teams[1].toLowerCase().includes(search.toLowerCase()))
        );
    });

    useEffect(() => {
        console.log('From GetMatch....')
        getLiveMatches()
            .then((data) => {
                const matchData = data.typeMatches;
                console.log('Fetched Match Data:', matchData);
                setMatches(matchData);
                if (matchData.length > 0) {
                    setLimit(matchData.slice(0, 5));
                }
                // setLoading(false)
            })
            .catch((err) => console.log(err));
    }, []);


    console.log('Limited Matches:', limit);
    return (
        <>
            {limit && (
                <Cricscore limit={limit} />
            )}
            <div className="cricbuzz__headerSearch">
                <div className="cricbuzz__headerSearchIcon">
                    <SearchIcon
                        style={{
                            color: "white",
                        }}
                    />
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search" />
                </div>
            </div>
            {/* {
                // loading ? (
                //     <Skeleton title={""} text={""} />
                // ) :
                matchType !== 0
                    ? matchType.map((match) => (
                        <ListCard key={match.id} matchData={match} />
                    ))
                    : matches.map((match) => (
                        <ListCard key={match.id} matchData={match} />
                    ))
            } */}

        </>
    );
}

export default GetMatches