
const { URL, LAST } = require('./constants.json')
const { parseRow } = require('./parser')

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
        if(!season || season === "last") season = LAST
        const res = await axios.get(
            URL.seasonUser
                .replace('{username}',username)
                .replace('{season}',season)
        )
        const { document } = (new JSDOM(res.data)).window
        const row = document.querySelector('tr.ak-position-me')
        const result = parseRow(row, false)
        if(!result) return false
        result.season = season === LAST ? 'last' : season
        return result
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
    try{
        if(!season || season === "last") season = LAST
        const res = await axios.get(URL.season.replace('{season}',season))
        const { document } = (new JSDOM(res.data)).window
        const rows = Array.from(document.querySelectorAll('table.ak-ladder tbody tr'))
        if(rows.length === 0) return false
        return {
            banner: 'https://static.ankama.com/krosmaga/www/modules/community/ladder/header_season.fr.jpg',
            top100: rows.map( row => parseRow(row,true) )
        }
    }catch(error){
        console.error(error)
        return false
    }
}

async function fetchGlobal(){
    try{
        const res = await axios.get(URL.global)
        const { document } = (new JSDOM(res.data)).window
        const rows = Array.from(document.querySelectorAll('table.ak-ladder tbody tr'))
        if(rows.length === 0) return false
        return {
            banner: 'https://static.ankama.com/krosmaga/www/modules/community/ladder/header_eternal.fr.jpg',
            top100: rows.map( row => parseRow(row,true) )
        }
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