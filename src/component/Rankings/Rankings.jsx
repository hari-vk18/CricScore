import React, { useState } from 'react'
import './Rankings.css'
import PlayersRank from './PlayersRank'
import TeamRank from './TeamRank'
import { Button, colors } from '@mui/material'
import { styled } from '@mui/system'

const CustomButton = styled(Button)(({ selected }) => ({
    backgroundColor: selected ? 'rgb(209,55,71)' : '#f0f0f0',
    backgroundImage: selected
        ? 'linear-gradient(292deg, rgba(209,55,71,1) 4%, rgba(216,92,77,1) 54%, rgba(230,122,75,1) 90%)'
        : 'none',
    color: selected ? 'white' : 'black',
}))

const ButtonContainer = styled('div')({
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
});

const ButtonGroup = styled('div')({
    display: 'flex',
    gap: '10px',
});

const ComponentContainer = styled('div')({
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export default function Rankings() {
    const [type, setType] = useState('players');
    const [format, setFormat] = useState('test');
    console.log("Rendered")
    const renderComponent = () => {
        console.log('Rendering component:', type, format);
        if (type === 'players') {
            return <PlayersRank format={format} />;
        } else if (type === 'team') {
            return <TeamRank format={format} />;
        }
        return null;
    };


    return (
        <div children='Rankings'>
            <div className='heading'>
                <h3>ICC Rankings</h3>
            </div>
            <div className='ButtonContain'>
                <ButtonContainer>
                    <ButtonGroup>
                        <CustomButton selected={type === 'players'} onClick={() => setType('players')}>
                            Player Ranking
                        </CustomButton>
                        <CustomButton selected={type === 'team'} onClick={() => setType('team')}>
                            Team Ranking
                        </CustomButton>
                    </ButtonGroup>
                    <ButtonGroup>
                        <CustomButton selected={format === 'test'} onClick={() => setFormat('test')}>
                            Test
                        </CustomButton>
                        <CustomButton selected={format === 'odi'} onClick={() => setFormat('odi')}>
                            ODI
                        </CustomButton>
                        <CustomButton selected={format === 't20'} onClick={() => setFormat('t20')}>
                            T20
                        </CustomButton>
                    </ButtonGroup>
                </ButtonContainer>
            </div>
            <ComponentContainer>
                {renderComponent()}
            </ComponentContainer>
        </div>
    )
}
