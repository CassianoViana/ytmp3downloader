import fs from "fs";
import { YTDownloader } from "./adapters/YTDownloader";

const downloader = new YTDownloader();

const filename = process.argv[2] || "/home/cassiano/Desktop/musicas.txt";
const outputPath = process.argv[3] || "/home/cassiano/Desktop/musicas";

console.log("Downloading from " + filename + "...");

fs.readFile(filename, "utf-8", async (error, data) => {
  if(!data){
    console.error('Create a file musicas.txt and run as "npx ts-node index.ts ./musicas.txt folder-where-to-save-musics"')
    return
  }
  let musicas = data.split("\n");

  var download = async (indice: number) => {
    await downloader.download(musicas[indice], outputPath, () => {
      if (indice < musicas.length) {
        return download(++indice);
      } else {
        return "Finished!";
      }
    });
  };
  download(0);
});
