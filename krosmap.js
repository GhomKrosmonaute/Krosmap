
const {
    fetchUserGlobal,
    fetchUserSeason,
    // fetchUserAvatar
} = require('./src/wrapper')

async function fetchUser( username ){
    return { 
        username,
        // avatar: await fetchUserAvatar( username ),
        global: await fetchUserGlobal( username ),
        lastSeason: await fetchUserSeason( username )
    }
}

module.exports = {
    fetchUser,
    fetchUserGlobal,
    fetchUserSeason,
    // fetchUserAvatar
}