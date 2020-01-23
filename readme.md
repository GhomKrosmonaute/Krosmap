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

## user data

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

## user missing data

to check because we do not always get the information we want

```js
return {
  profile: false,
  global: false,
  lastSeason: false
}
```

## stable methods

```js
fetchUser( username )                       // fetch all data of user

fetchUserGlobal( username )                 // fetch global position
fetchUserSeason( username, season="last" )  // fetch season position

fetchGlobal()                               // fetch global top 100
fetchSeason( season="last" )                // fetch season top 100

fetchUserProfile( username )                // fetch profile only
```