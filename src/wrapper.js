
const { URL } = require('./constants.json')
const { parseRow } = require('./parser')

const { JSDOM } = require('jsdom')
const axios = require('axios')

async function fetchUserGlobal( username ){
    const res = await axios.get(URL.globalUser.replace('{username}',username))
    const { document } = (new JSDOM(res.data)).window
    const row = document.querySelector('tr.ak-position-me')
    return parseRow(row)
}

async function fetchUserSeason( username, season ){
    if(!season || season === "last") season = 999
    const res = await axios.get(
        URL.seasonUser
            .replace('{username}',username)
            .replace('{season}',season)
    )
    const { document } = (new JSDOM(res.data)).window
    const row = document.querySelector('tr.ak-position-me')
    const result = parseRow(row)
    result.season = season === 999 ? 'last' : season
    return result
}

// async function fetchUserAvatar( username ){
//     return {
//         error: {
//             message: '404 not found',
//             code: 404
//         }
//     }
// }

module.exports = {
    fetchUserGlobal,
    fetchUserSeason,
    // fetchUserAvatar
}