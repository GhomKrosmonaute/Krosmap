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
  username: 'OTK-Val',
  global: { position: 722, win: 1558, lose: 1167, elo: 1553 },
  lastSeason: { position: 3409, win: 3, lose: 1, rank: 9, season: 'last' }
}
```

## json missing data

to check because we do not always get the information we want

```js
return {
  username: 'OTK-Val',
  global: { error: { message: '404 not found', code: 404 } },
  lastSeason: { error: { message: '404 not found', code: 404 }, season: 'last' }
}
```

## stable methods

```js
fetchUser( username )
fetchUserGlobal( username )
fetchUserSeason( username, season="last" )
```