
const { URL } = require('./constants.json')
const { parseRow } = require('./parser')

const { JSDOM } = require('jsdom')
const axios = require('axios')

async function fetchUserGlobal( username ){
    const res = await axios.get(URL.globalUser.replace('{username}',username))
    const { document } = (new JSDOM(res.data)).window
    const row = document.querySelector('tr.ak-position-me')
    return parseRow(row, false)
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
    const result = parseRow(row, false)
    result.season = season === 999 ? 'last' : season
    return result
}

async function fetchUserProfile( username ){
    try{
        const res = await axios.get(URL.profile.replace('{username}',username))
        const { document } = (new JSDOM(res.data)).window
        return {
            username,
            avatar: document.querySelector('img.ak-thumb').getAttribute('src'),
            description: document.querySelector('div.ak-bbcode-content').innerHTML
        }
    }catch(error){
        return {
            username,
            error: {
                message: '429 try again later',
                code: 429
            }
        }
    }
}

async function fetchSeason( season ){
    if(!season || season === "last") season = 999
    const res = await axios.get(URL.season.replace('{season}',season))
    const { document } = (new JSDOM(res.data)).window
    const rows = Array.from(document.querySelectorAll('table.ak-ladder tbody tr'))
    return {
        banner: 'https://static.ankama.com/krosmaga/www/modules/community/ladder/header_season.fr.jpg',
        top100: rows.map( row => parseRow(row,true) )
    }
}

async function fetchGlobal(){
    const res = await axios.get(URL.global)
    const { document } = (new JSDOM(res.data)).window
    const rows = Array.from(document.querySelectorAll('table.ak-ladder tbody tr'))
    return {
        banner: 'https://static.ankama.com/krosmaga/www/modules/community/ladder/header_eternal.fr.jpg',
        top100: rows.map( row => parseRow(row,true) )
    }
}

module.exports = {
    fetchUserGlobal,
    fetchUserSeason,
    fetchUserProfile,
    fetchSeason,
    fetchGlobal
}