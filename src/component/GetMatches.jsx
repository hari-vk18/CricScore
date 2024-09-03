import React, { useEffect, useState } from 'react'
import { Button, styled } from '@mui/material';
import Cricscore from './Cricscore'
import { getLiveMatchInfo, getRecentMatchInfo } from '../api/api'
import './css/ListCard.css'

const navigationOptions = [
    { label: 'International' },
    { label: 'League' },
    { label: 'Domestic' },
    { label: 'Womens' },
]

const MatchType = styled(Button)(({ selected }) => ({
    padding: '5px 5px',
    borderRadius: '5px',
    margin: '5px',
    background: selected
        ? 'linear-gradient(292deg, rgba(209,55,71,1) 4%, rgba(216,92,77,1) 54%, rgba(230,122,75,1) 90%)'
        : '#f0f0f0',
    color: selected ? 'white' : 'black',
    '&:hover': {
        background: selected
            ? 'linear-gradient(292deg, rgba(209,55,71,1) 4%, rgba(216,92,77,1) 54%, rgba(230,122,75,1) 90%)'
            : '#e0e0e0',
        color: 'black',
    },
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center', // Center text inside the button
    alignItems: 'center',
    boxSizing: 'border-box', // Ensures padding and border are included in the element's width and height
    minWidth: '120px',
}))

const ButtonContainer = styled('div')({
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '10px',
});

function GetMatches() {
    const [limit, setLimit] = useState([]);
    const [search, setSearch] = useState("");
    const [recentMatches, setRecentMatches] = useState([])
    const [selectedOption, setSelecterOption] = useState('International')

    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('From GetMatch....')
        getLiveMatchInfo()
            .then((data) => {
                const matchData = data.typeMatches;
                console.log('Fetched Match Data:', matchData);
                // setMatches(matchData);
                if (matchData.length > 0) {
                    setLimit(matchData.slice(0, 5));
                }
                // setLoading(false)
            })
            .catch((err) => console.log(err));

        getRecentMatchInfo()
            .then((data) => {
                const get = data.typeMatches;
                setRecentMatches(get);
            })
            .catch((err) => console.log(err));
    }, []);


    console.log('Limited Matches:', limit);
    return (
        <>
            {limit && (
                <Cricscore limit={limit} />
            )}
            {/* <div className="cricbuzz__headerSearch">
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
            </div> */}
            <ButtonContainer >
                {
                    navigationOptions.map((Option, index) => (
                        <MatchType
                            key={index}
                            selected={selectedOption === Option.label}
                            onClick={() => setSelecterOption(Option.label)}>
                            {Option.label}
                        </MatchType>
                    ))
                }
            </ButtonContainer>

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