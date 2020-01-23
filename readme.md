
<img src="https://static.ankama.com/g/modules/masterpage/block/header/navbar/krosmaga/logo_md.png">

# Krosmap

Krosmaga website parser

## install

```
npm i krosmap --save
```

## usage

```js
const krosmap = require('krosmap')

const json = await krosmap.fetchUser('OTK-Val')

console.log(json) // Data may be missing
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

## other properties

```js
krosmap.images.global //=> https://static.ankama.com/krosmaga/www/modules/community/ladder/header_eternal.fr.jpg
krosmap.images.season //=> https://static.ankama.com/krosmaga/www/modules/community/ladder/header_season.fr.jpg
```

<hr>

<img src="https://static.ankama.com/web-avatar/0.png">

## fetchUser( string: username ): Promise( Object )

When you fetch a user with **fetchUser** method, you get a JSON object containing information on their Ankama profile as well as their position in the global ranking and their position in the seasonal ranking of the last season.
<br><br>
The fetchUser method simply calls three other Krosmap methods: **fetchUserProfile**, **fethUserGlobal** and **fetchUserSeason**.

```js
return {
  profile: {
    username: 'OTK-Val',
    avatar: 'https://static.ankama.com/web-test/0.png',
    description: "\nOTK-Val&nbsp;n'a pas encore rédigé de description personnalisée"
  },
  global: { position: 722, win: 1558, lose: 1167, elo: 1553 },
  lastSeason: { position: 3409, win: 3, lose: 1, rank: 9 }
}
```

Krosmap being a data parser tool from Krosmaga website, there is a non-zero chance that some of its data will not reach you. So consider testing each direct property of the JSON data.

```js
return {
  profile: false, // usually due to error 429 (try again later)
  global: false, // just because of bugs in the web page
  lastSeason: false // the same as for "global" property
}
```

<hr>

<img src="https://static.ankama.com/krosmaga/www/modules/community/ladder/header_eternal.fr.jpg">

## fetchGlobal(  ): Promise( Array )

The fetchGlobal method provides the top 100 of the global ranking.

```js
// example data are fake kappa
return [
  { position: 1, win: 100, lose: 1, elo: 1950, username: 'Ghom' },
  { position: 2, win: 100, lose: 5, elo: 1800, username: 'OTK-Val' },
  { position: 3, win: 200, lose: 120, elo: 1400, username: 'ASK-ing' },
  { position: 4, win: 100, lose: 60, elo: 1310, username: 'BOSS-RNG' },
  {...}
  { position: 100, win: 50, lose: 50, elo: 900, username: 'Nono42' },
]
```

<hr>

<img src="https://static.ankama.com/krosmaga/www/modules/community/ladder/header_season.fr.jpg">

## fetchSeason( number|string: ?season = 'last' ): Promise( Array )

The fetchSeason method provides the top 100 of the last season ranking or of the given season.

```js
return [
  { position: 1, win: 100, lose: 1, rank: 30, username: 'Ghom' },
  { position: 2, win: 100, lose: 5, rank: 30, username: 'OTK-Val' },
  { position: 3, win: 200, lose: 120, rank: 30, username: 'ASK-ing' },
  { position: 4, win: 100, lose: 60, rank: 30, username: 'BOSS-RNG' },
  {...}
  { position: 100, win: 50, lose: 50, rank: 29, username: 'Nono42' },
]
```