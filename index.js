const axios = require('axios');
const prompt = require('prompt-sync')();

let videoUrl = prompt('Youtube video link : ');
console.log(`video url >> ${videoUrl}`);

let eurl = 'https://youtube.googleapis.com/v/';
let url = new URL(videoUrl);
console.log(url.href);
console.log(url.search);

let videoID = url.searchParams.get('v');
let new_eurl = eurl + videoID;
console.log(`video id = ${videoID}`);
console.log(new_eurl);

let getUrl = `https://www.youtube.com/get_video_info?video_id=${videoID}&eurl=${new_eurl}`;
console.log('link generated > ', getUrl);

getVideoInfo(getUrl);

async function getVideoInfo(url){
    const response = await axios.get(url);
    const decodedResponse = Object.fromEntries(new URLSearchParams(response.data));
    const jsonResponse = JSON.parse(decodedResponse.player_response);
    const { videoDetails, streamingData } = jsonResponse;
    const allUrls = [streamingData.formats, streamingData.adaptiveFormats];
    console.log('Video Title : ', videoDetails.title);

    allUrls[0].forEach(element => {
        if(element.qualityLabel){
            console.log('Quality : ', element.qualityLabel);
        }
        console.log('Type : ', element.mimeType);
        console.log('Url : ', element.url, '\n');
        console.log('-----------------------');
    });
    allUrls[1].forEach(element => {
        if(element.qualityLabel){
            console.log('Quality : ', element.qualityLabel);
        }
        console.log('Type : ', element.mimeType);
        console.log('Url : ', element.url, '\n');
        console.log('-----------------------');
    });
}