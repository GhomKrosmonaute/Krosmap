
const {
    fetchUserGlobal,
    fetchUserSeason,
    fetchUserProfile,
    fetchGlobal,
    fetchSeason
} = require('./src/wrapper')

async function fetchUser( username ){
    return {
        profile: await fetchUserProfile( username ),
        global: await fetchUserGlobal( username ),
        lastSeason: await fetchUserSeason( username )
    }
}

module.exports = {
    fetchUser,
    fetchUserGlobal,
    fetchUserSeason,
    fetchUserProfile,
    fetchGlobal,
    fetchSeason,
    images: {
        global: 'https://static.ankama.com/krosmaga/www/modules/community/ladder/header_eternal.fr.jpg',
        season: 'https://static.ankama.com/krosmaga/www/modules/community/ladder/header_season.fr.jpg'
    }
}