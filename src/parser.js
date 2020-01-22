
function parseRow( row, getUsername ){
    if(!row) return { error: {
        message: '404 not found',
        code: 404
    }}
    const result = {
        position: parseInt(row.querySelector('.ak-icon-position').innerHTML,10),
        win: parseInt(row.querySelector('.ak-win').innerHTML,10),
        lose: parseInt(row.querySelector('.ak-lose').innerHTML,10)
    }
    const rank = row.querySelector('.ak-rank')
    const elo = row.querySelector('.ak-elo')
    if(getUsername) result.username = row.querySelector('.ak-nickname').innerHTML.trim()
    if(rank) result.rank = parseInt(rank.innerHTML,10)
    if(elo) result.elo = parseInt(elo.innerHTML,10)
    return result
}

module.exports = {
    parseRow
}