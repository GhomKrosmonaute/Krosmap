
const { URL, LAST } = require('./constants.json')
const { parseRow, parseSeason } = require('./parser')

const { JSDOM } = require('jsdom')
const axios = require('axios')

async function fetchUserGlobal( username ){
    try{
        const res = await axios.get(URL.globalUser.replace('{username}',username))
        const { document } = (new JSDOM(res.data)).window
        const row = document.querySelector('tr.ak-position-me')
        return parseRow(row, false)
    }catch(error){
        console.error(error)
        return false
    }
}

async function fetchUserSeason( username, season ){
    try{
        season = parseSeason(season)
        const res = await axios.get(
            URL.seasonUser
                .replace('{username}',username)
                .replace('{season}',season)
        )
        const { document } = (new JSDOM(res.data)).window
        const row = document.querySelector('tr.ak-position-me')
        return parseRow(row, false)
    }catch(error){
        console.error(error)
        return false
    }
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
        console.error(error)
        return false
    }
}

async function fetchSeason( season ){
    return fetchLadder( URL.season.replace('{season}',parseSeason(season)) )
}

function fetchGlobal(){
    return fetchLadder( URL.global )
}

async function fetchLadder( url ){
    try{
        const res = await axios.get(url)
        const { document } = (new JSDOM(res.data)).window
        const rows = Array.from(document.querySelectorAll('table.ak-ladder tbody tr'))
        if(rows.length === 0) return false
        return rows.map( row => parseRow(row,true) )
    }catch(error){
        console.error(error)
        return false
    }
}

module.exports = {
    fetchUserGlobal,
    fetchUserSeason,
    fetchUserProfile,
    fetchSeason,
    fetchGlobal
}