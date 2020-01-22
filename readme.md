# Krosmap

Krosmaga website parser

## install

```
npm i krosmap --save
```

## use

```js
const krosmap = require('krosmap')

const json = await krosmap.fetchUser('OTK-Val')

console.log(json) // Data may be missing
```

## json data

```js
return {
  profile: {
    username: 'OTK-Val',
    avatar: 'https://static.ankama.com/web-test/0.png',
    description: "\nOTK-Val&nbsp;n'a pas encore rédigé de description personnalisée"
  },
  global: { position: 722, win: 1558, lose: 1167, elo: 1553 },
  lastSeason: { position: 3409, win: 3, lose: 1, rank: 9, season: 'last' }
}
```

## json missing data

to check because we do not always get the information we want

```js
return {
  profile: {
    username: 'OTK-Val',
    error: { message: '429 try again later', code: 429 }
  }
  global: { error: { message: '404 not found', code: 404 } },
  lastSeason: { error: { message: '404 not found', code: 404 }, season: 'last' }
}
```

## stable methods

```js
fetchUser( username ) // fetch all data of user
fetchUserProfile( username ) // fetch profile
fetchUserGlobal( username ) // fetch global position
fetchUserSeason( username, season="last" )
fetchSeason( season="last" ) // fetch season top 100
fetchGlobal() // fetch global top 100
```