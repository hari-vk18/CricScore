import React, { useEffect, useState } from 'react'
import './css/News.css'
import { getMatchInfo, getNews } from '../api/api'
import Cricscore from './Cricscore'
import './css/Cricscore.css'
import NewsCard from './NewsCard'
import './css/News.css'


export default function News() {
    const [limit, setLimit] = useState([]);
    const [news, setNews] = useState([]);
    useEffect(() => {
        console.log('Fetching match info...');
        getMatchInfo()
            .then((data) => {
                const matchData = data.data;
                console.log('Fetched Match Data:', matchData);
                if (matchData.length > 0) {
                    setLimit(matchData.slice(0, 5));
                }
                // setLoading(false)
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log('Fetching news info...');
        getNews()
            .then((data) => {
                const newsData = data.storyList;
                console.log('Fetched News Data:', newsData);
                if (newsData.length > 0) {
                    setNews(newsData);
                }
            })
    }, []);
    return (
        <>

            <div className='News'>
                <h3>Latest Sports News</h3>
                {
                    news &&
                    (
                        news.map((data) => {
                            if (data.story)
                                return <NewsCard news={data} />
                        })
                    )
                }
            </div>

        </>

    )
}
