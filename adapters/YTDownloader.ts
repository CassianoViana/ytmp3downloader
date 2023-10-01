import { v4 as uuidv4 } from 'uuid';
import ytdl from 'ytdl-core';

import YoutubeMp3Downloader from "youtube-mp3-downloader";


export class YTDownloader {
    async download(url: string, outputPath:string, onFinish: () => {}) {

        try {
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title

            const YD = new YoutubeMp3Downloader({
                "ffmpegPath": "/usr/bin/ffmpeg",
                "outputPath": outputPath,
                "youtubeVideoQuality": "highestaudio",
                "queueParallelism": 2,
                "progressTimeout": 1000
            });

            YD.on("finished", function (err, data) {
                console.log(JSON.stringify(data));
                onFinish()
            });

            YD.on("error", function (error) {
                onFinish()
                console.log(error);
            });

            YD.on("progress", function (progress) {
                console.log(`Downloading... ${title}: ${progress.progress.percentage.toFixed(0)}%`);
            });

            let filename = `${uuidv4()} ${title}.mp3`;
            YD.download(info.videoDetails.videoId, filename);
        } catch (e) {
            onFinish()
        }

    }

}