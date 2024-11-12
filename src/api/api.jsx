// const API_KEY = "ca048598-f6a7-4cbd-b568-16db38793785";
// const API_KEY = "9eda0e2e-7f99-4ca2-bf6d-09b807405686";
const API_KEY = "eb48011d-d3a9-4fab-9942-e386f72ba8b2";

const CACHE_EXPIRY_TIME = 1; // Cache expiry time in milliseconds (1 hour)

const getCachedData = (key) => {
    const cachedItem = localStorage.getItem(key);
    if (cachedItem) {
        const { data, timestamp } = JSON.parse(cachedItem);
        if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
            return data;
        }
    }
    return null;
};

const setCacheData = (key, data) => {
    const cacheItem = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
};

export const getMatchInfo = async () => {

    const cacheKey = 'matchInfo';
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        return cachedData;
    }
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getMatchInfo1 = async () => {

    const cacheKey = 'matchInfo1';
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        return cachedData;
    }
    const url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log('From Apiiii', result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getMatchScore = async (id) => {

    const cacheKey = `matchScore${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${id}`
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log('From API'.result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getMatchScore1 = async (id, retries = 5, delay = 2000) => {

    const cacheKey = `matchScore1${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/scard`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };
    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const result = await response.json();
        console.log('From API', result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getMatchInfo2 = async (id, retries = 5, delay = 2000) => {

    const cacheKey = `matchScore1${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };
    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const result = await response.json();
        console.log('From API', result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}
export const getSeriesInfo = async (id, retries = 5, delay = 2000) => {

    const cacheKey = `series${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://cricbuzz-cricket.p.rapidapi.com/series/v1/7343`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('From API', result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getPlayerState = async (name) => {
    // const url = `https://api.cricapi.com/v1/players?apikey=${API_KEY}&offset=0&search=${name}`
    // return fetch(url)
    //     .then((res) => res.json())
    //     .catch((err) => console.log(err))

    const cacheKey = `playerState${name}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/players/search?plrN=${name}`;
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=${name}`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getPlayerInfo = async (id) => {

    const cacheKey = `playerInfo${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://api.cricapi.com/v1/players_info?apikey=${API_KEY}&id=${id}`
    try {
        const response = await fetch(url);
        const result = await response.json();
        setCacheData(cacheKey, result)
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getPlayer = async (id) => {
    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/players/get-info?playerId=${id}`;


    const cacheKey = `player${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${id}`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCacheData(cacheKey, result)
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};


export const getPlayerBat = async (id) => {

    const cacheKey = `playerBat${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/players/get-batting?playerId=${id}`;
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${id}/batting`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCacheData(cacheKey, result)
        console.log(`Fetching data for player ${id}`);
        console.log(`Data from cache:`, cachedData);
        console.log(`Data from API:`, result);

        return result;
    } catch (error) {
        console.error(error);
    }
}
export const getPlayerBowl = async (id) => {

    const cacheKey = `playerBowl${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/players/get-bowling?playerId=${id}`;
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${id}/bowling`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCacheData(cacheKey, result)
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getNews = async () => {

    const cacheKey = `news`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/news/list`;
    const url = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index';
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCacheData(cacheKey, result)
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getNewsDetails = async (id, retries = 5, delay = 2000) => {

    const cacheKey = `newsDetails${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/news/detail?storyId=${id}`;
    const url = `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const result = await response.json();
        // console.log(result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error('Error fetching news details:', error);
        throw error;
    }
}


export const getImg = async (id, retries = 3, delay = 5000) => {
    const cacheKey = `image${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/get-image?id=${id}&p=de`;
    const url = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${id}/i.jpg?p=det&d=high`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setCacheData(cacheKey, objectUrl)
        console.log(objectUrl);
        return objectUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}
export const getImgage = async (id, name, retries = 3, delay = 5000) => {
    const cacheKey = `image${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/get-image?id=${id}&p=de`;
    const url = `http://localhost:8080/api/image/${name}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setCacheData(cacheKey, objectUrl)
            console.log(objectUrl);
            return objectUrl;
        } else if (response.status === 404) {
            throw new Error('404');
        }
        else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}

export const getRankings = async (format, role, retries = 5, delay = 2000) => {

    const cacheKey = `ranks${format}${role}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    // const url = `https://unofficial-cricbuzz.p.rapidapi.com/news/detail?storyId=${id}`;
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${role}?formatType=${format}`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            // 'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'

        }
    };

    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const result = await response.json();
        // console.log(result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error('Error fetching news details:', error);
        throw error;
    }
}

const fetchWithRetry = async (url, options, retries, delay) => {
    const fetchRetry = async (retryCount, delayTime) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status === 429 && retryCount > 0) {
                    // If rate limit exceeded, wait and retry
                    console.warn(`Rate limit exceeded. Retrying in ${delayTime} ms...`);
                    await new Promise(resolve => setTimeout(resolve, delayTime));
                    return fetchRetry(retryCount - 1, delayTime * 1.5); // Exponential backoff
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return response;
        } catch (error) {
            console.error('Error fetching:', error);
            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, delayTime));
                return fetchRetry(retryCount - 1, delayTime * 2); // Exponential backoff
            } else {
                throw error;
            }
        }
    };

    return fetchRetry(retries, delay);
}

// this from Crickbuzz - official - apis

export const getLiveMatchInfo = async (id, retries = 5, delay = 2000) => {

    const cacheKey = `livematchScore1${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://crickbuzz-official-apis.p.rapidapi.com/matches/live`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'

        }
    };
    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const result = await response.json();
        console.log('From API', result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}


export const getRecentMatchInfo = async (retries = 5, delay = 2000) => {

    const cacheKey = `recentMatchScore`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://crickbuzz-official-apis.p.rapidapi.com/matches/recent`;
    const options = {
        method: 'GET',
        headers: {
            // 'x-rapidapi-key': '3fc5382d1cmshf395be7c65f49b3p1f69f5jsn905c94a8d73a',
            // 'x-rapidapi-key': '4097dc4ba2mshaa56497580899e3p1a0dedjsn00c62add3f11',
            // 'x-rapidapi-key': '134db4461dmsha390ba51c0b7c41p1cce62jsn455da64d1f63',
            // 'x-rapidapi-key': '70a3203631mshfaafdd485419ad1p1b847fjsn90d14754b6ba',
            'x-rapidapi-key': 'a7f1ac3816msh02a3d5328965dbbp187644jsn5b2892b128b0',
            // 'x-rapidapi-key': '25ed6054famshd5f7915eda2908ep16b7dfjsnb3c2299c3f93',
            // 'x-rapidapi-host': 'unofficial-cricbuzz.p.rapidapi.com'
            'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'

        }
    };
    try {
        const response = await fetchWithRetry(url, options, retries, delay);
        const result = await response.json();
        console.log('From API', result);
        setCacheData(cacheKey, result)
        return result;
    } catch (error) {
        console.error(error);
    }
}