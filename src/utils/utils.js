export const parsePlaylist = (data) => {
    // console.log(data);
    return data.map(item => {
        let parsedTrack = parseData([item.track]);
        return parsedTrack[0];
    })
}
  
export const parseData = (data) => {
    return data.map(item => {
        let artistList = item.artists.map(person => {
            return person.name;
        })
    
        return {id: item.id, title: item.name, artist: artistList.join(', '), time: millisToMinutesAndSeconds(item.duration_ms)}
    })
}
  
const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}