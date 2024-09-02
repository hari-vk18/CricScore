import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { getImg, getNewsDetails } from '../api/api';
import './css/News.css'


const useStyles = (theme) => ({
    root: css`
      width: 80%;
      margin-top: 20px;
    `,
    heading: css`
      font-size: 1.1rem;
      font-weight: 500;
    `,
    imageContainer: css`
      width: 50%;
      display: flex;
      justify-content: center;
    `,
    image: css`
      width: 50%;
      height: auto;
      max-width: 100px;
      object-fit: cover;
    `,
});

function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp, 10));
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    return date.toLocaleString();
}


export default function NewsCard({ news }) {

    const theme = useTheme();
    const styles = useStyles(theme);

    const [image, setImage] = React.useState()
    const [newsDetails, setNewsDetails] = React.useState([]);


    React.useEffect(() => {
        getImg(news.story.imageId)
            .then((response) => {
                setImage(response)
                // console.log(response)
            })
            .catch((error) => console.error(error))
    }, [news.story?.imageId])

    React.useEffect(() => {

        getNewsDetails(news.story.id)
            .then((res) => {
                console.log(res.content)
                setNewsDetails(res.content.slice(0, 5))
            })
            .catch((error) => console.error(error))
    }, [news.story.id])

    return (
        <div css={styles.root} className='NewsDiv'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >

                    <div className="accordSummary">
                        <h4>{news.story && news.story.intro}</h4>
                        <small>{formatDate(news.story.pubTime)}</small>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="accordDetails">
                        <p>{news.story.hline}</p>
                        <div css={styles.imageContainer} className='accordDetails'>
                            {image && <img src={image} alt="News" css={styles.image} />}
                            <p>Source :<span>{news.story.coverImage?.source}</span></p>
                        </div>
                        <div className='accordDetailsDesc'>
                            {newsDetails?.map((data, index) => (
                                <React.Fragment key={index}>
                                    <p>{data.content?.contentValue}</p>
                                    <br />
                                </React.Fragment>
                            ))}

                        </div>
                        <div className="accordSource">
                            <p>News Courtsey: <span className="source">{news.story.source}</span></p>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
