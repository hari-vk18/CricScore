import React, { useEffect, useState } from 'react'
import { getMatchInfo, getPlayerState } from '../api/api'
import SearchIcon from "@mui/icons-material/Search";
import PlayerCard from './PlayerCard'
import './css/PlayerSearch.css'
import { Button, styled } from '@mui/material';

const Buttons = styled(Button)(({ selected }) => ({
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

const PlayerList = styled('div')({
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '10px',
})
export default function PlayerSearch() {
    const [PlayerState, setPlayerState] = useState(null);
    const [search, setSearch] = useState("");
    const [player, setPlayer] = useState([]);
    // const [loading, setLoading] = useState(true);

    const handleClick = (id) => {
        setPlayerState(id === PlayerState ? null : id);
    }

    useEffect(() => {
        if (search !== "")
            getPlayerState(search)
                .then((data) => {
                    console.log(data.player)
                    if (data.player) {
                        setPlayer(data.player.slice(0, 15));
                    } else {
                        console.error("No player data found");
                    }
                })
                .catch((err) => console.log(err));
    }, [search]);
    return (
        <>
            <div className="playerSearch">
                <div className="headerSearchIcon">
                    <SearchIcon
                        style={{
                            color: "rgba(216,92,77,1)",
                        }}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search" />
                </div>

            </div>
            <div className="playerCard">
                <div className='player'>
                    {
                        player.map((player) => {
                            // return <PlayerCard id={player.id} player={player} />
                            return (
                                <PlayerList>{player.name}
                                    <Buttons key={player.id} onClick={() => handleClick(player.id)} selected={player.name}>See More</Buttons>
                                    {
                                        PlayerState === player.id && <PlayerCard id={player.id} player={player} />
                                    }
                                </PlayerList>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
