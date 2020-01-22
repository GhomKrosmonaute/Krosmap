
const { urls } = require('./constants.json')
const { JSDOM } = require('jsdom')
const got = require('got')

async function fetchUser( username ){
    try{
        const [
            profileHTML,
            lastSeasonHTML,
            globalHTML
        ] = await Promise.all([
            'profile',
            'lastSeason',
            'global'
        ].map(ref => {
            return got(urls[ref].replace('{username}',username))
        }))
    }catch(error){
        console.error(error)
    }
}

async function fetchTop( season ){
    if(!season){
        // lastSeason
    }else{
        const num = Number(season)
        if(Number.isNaN(num)){
            // global
        }else{
            // target season
        }
    }
}

module.exports = {
    fetchUser,
    fetchTop
}