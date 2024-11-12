import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { Avatar, Button } from '@mui/material';
import { getPlayer, getPlayerBat, getPlayerBowl, getPlayerInfo } from '../api/api';
import './css/PlayerCard.css'

const useStyles = (theme) => ({
    root: css`
      width: 80%;
    `,
    heading: css`
      font-size: 1.1rem;
      font-weight: 500;
    `,
});

export default function PlayerCard({ player, id }) {
    const [playerInfo, setPlayerInfo] = React.useState({});
    const [playerBat, setPlayerBat] = React.useState([]);
    const [playerBowl, setPlayerBowl] = React.useState([]);

    const theme = useTheme();
    const styles = useStyles(theme);

    React.useEffect(() => {
        setPlayerInfo(player)
        console.log("From Player Card", player)

        getPlayerBat(id)
            .then((bat) => {
                setPlayerBat(bat.values);
                console.log("for bat", bat.values)
            })
            .catch((err) => {
                console.log(err)
            })
        getPlayerBowl(id)
            .then((bowl) => {
                setPlayerBowl(bowl.values);
                console.log("for bat", bowl.values)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <div css={styles.root}>
            <div className="prof__details">
                <div className="prof__detailsInfo">
                    <div className="prof__detailsImg">
                        <Avatar src={playerInfo.image} alt="img" />
                    </div>
                    <p>{playerInfo.name}</p>
                    <p>{playerInfo.country}</p>
                </div>
                <h4>PERSONAL INFORMATION</h4>
                <div className="prof__detailsPersonal">
                    <div className="prof__detailsPerson">
                        <div className="prof__details">

                            {/* playerInfo.dateOfBirth && <p>Born</p> */}
                            <p>Born</p>


                        </div>
                        {/* <div className="prof__details">
                                    {
                                        playerInfo.currentAge && <p>Age</p>
                                    }

                                </div> */}
                        <div className="prof__details">
                            {
                                playerInfo.role && <p>Role</p>
                            }

                        </div>
                        <div className="prof__details">
                            {
                                playerInfo.bat && <p>Batting Style</p>
                            }

                        </div>
                        <div className="prof__details">
                            {
                                playerInfo.bowl && <p>Bowling Style</p>
                            }

                        </div>
                    </div>
                    <div className="prof__detailsPersonInfo">
                        <div className="prof__detailsPerInfo">
                            <div className="prof__detailInfo">
                                <p>{playerInfo.DoBFormat}</p>
                            </div>
                            {/* <div className="prof__detailInfo">
                                        <p>{playerInfo.currentAge}</p>
                                    </div> */}
                            <div className="prof__detailInfo">
                                <p>{playerInfo.role}</p>
                            </div>
                            <div className="prof__detailInfo">
                                <p>{playerInfo.bat}</p>
                            </div>
                            <div className="prof__detailInfo">
                                <p>{playerInfo.bowl}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    playerInfo.teams && <div className="prof__teams">
                        <h4>TEAMS</h4>
                    </div>
                }
                <div className="prof__teamsName"><p>
                    {playerInfo.teams}</p>
                </div>
                {
                    playerInfo.bio && <div className="prof__teams">
                        <h4>PROFILE</h4>
                    </div>
                }

                <div className="prof__teamsName"><p>
                    {playerInfo.bio?.replace(/<br\s*\/?>|<\/?b>/gi, '') || ''}</p>
                </div>
                {
                    playerInfo.bat && <div className="prof__teams">
                        <h4>BATTING STATS</h4>
                    </div>
                }
                <table className='table-container'>
                    <tr>
                        <th>Batting Stats</th>
                        <th>Tests</th>
                        <th>ODIs</th>
                        <th>T20Is</th>
                        <th>IPL</th>
                    </tr>
                    <tr>
                        <td>Matches</td>
                        <td>{playerBat[0] ? playerBat[0].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[0].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[0].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[0].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Innings</td>
                        <td>{playerBat[0] ? playerBat[1].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[1].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[1].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[1].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Runs</td>
                        <td>{playerBat[0] ? playerBat[2].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[2].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[2].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[2].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Balls</td>
                        <td>{playerBat[0] ? playerBat[3].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[3].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[3].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[3].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Highest</td>
                        <td>{playerBat[0] ? playerBat[4].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[4].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[4].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[4].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Average</td>
                        <td>{playerBat[0] ? playerBat[5].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[5].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[5].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[5].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>SR</td>
                        <td>{playerBat[0] ? playerBat[6].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[6].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[6].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[6].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Not Out</td>
                        <td>{playerBat[0] ? playerBat[7].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[7].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[7].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[7].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Fours</td>
                        <td>{playerBat[0] ? playerBat[8].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[8].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[8].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[8].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Sixes</td>
                        <td>{playerBat[0] ? playerBat[9].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[9].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[9].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[9].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>Ducks</td>
                        <td>{playerBat[0] ? playerBat[10].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[10].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[10].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[10].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>50s</td>
                        <td>{playerBat[0] ? playerBat[11].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[11].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[11].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[11].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>100s</td>
                        <td>{playerBat[0] ? playerBat[12].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[12].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[12].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[12].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td>200s</td>
                        <td>{playerBat[0] ? playerBat[13].values[1] : ""}</td>
                        <td>{playerBat[0] ? playerBat[13].values[2] : ""}</td>
                        <td>{playerBat[0] ? playerBat[13].values[3] : ""}</td>
                        <td>{playerBat[0] ? playerBat[13].values[4] : ""}</td>
                    </tr>
                </table>

                {
                    playerInfo.data?.bowling && <div className="prof__teams">
                        <h4>BOWLING STATS</h4>
                    </div>
                }
                <table className="table-container">
                    <tr>
                        <th>Bowling Stats</th>
                        <th>Tests</th>
                        <th>ODIs</th>
                        <th>T20Is</th>
                        <th>IPL</th>
                    </tr>
                    <tr>
                        <td>Matches</td>
                        <td>{playerBowl[0] ? playerBowl[0].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[0].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[0].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[0].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Innings</td>
                        <td>{playerBowl[0] ? playerBowl[1].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[1].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[1].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[1].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Balls</td>
                        <td>{playerBowl[0] ? playerBowl[2].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[2].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[2].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[2].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Runs</td>
                        <td>{playerBowl[0] ? playerBowl[3].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[3].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[3].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[3].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Maidens</td>
                        <td>{playerBowl[0] ? playerBowl[4].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[4].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[4].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[4].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Wickets</td>
                        <td>{playerBowl[0] ? playerBowl[5].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[5].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[5].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[5].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Avg</td>
                        <td>{playerBowl[0] ? playerBowl[6].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[6].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[6].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[6].values[4] : ""}</td>
                    </tr>
                    <tr>
                        <td  >Eco</td>
                        <td>{playerBowl[0] ? playerBowl[7].values[1] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[7].values[2] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[7].values[3] : ""}</td>
                        <td>{playerBowl[0] ? playerBowl[7].values[4] : ""}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
