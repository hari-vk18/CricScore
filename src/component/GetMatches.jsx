import React, { useEffect, useState } from 'react'
import { Button, styled } from '@mui/material';
import Cricscore from './Cricscore'
import { getLiveMatchInfo, getRecentMatchInfo } from '../api/api'
import './css/ListCard.css'
import International from './International';

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

const ComponentContainer = styled('div')({
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

function GetMatches() {
    const [matches, setMatches] = useState([])
    const [limit, setLimit] = useState([]);
    const [search, setSearch] = useState("");
    const [recentMatches, setRecentMatches] = useState([])
    const [selectedOption, setSelecterOption] = useState('International')

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
        getLiveMatchInfo()
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

        getRecentMatchInfo()
            .then((data) => {
                const get = data.typeMatches;
                console.log("recent", get);
                setRecentMatches(get.slice(0, 5));
            })
            .catch((err) => console.log(err));
    }, []);


    const renderComponent = () => {
        return <International MatchesTypes={selectedOption} recentMatches={recentMatches} />;
    };


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
            <ComponentContainer>
                {renderComponent()}
            </ComponentContainer>


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