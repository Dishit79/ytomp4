import { ytDownload } from "https://deno.land/x/yt_download/mod.ts";


const input = prompt('Please enter yt url');
// @ts-ignore
const vidId = matchYoutubeUrl(input)

const name = prompt('Please enter vid name');


const stream = await ytDownload(vidId)

console.log(vidId)

// Pipe the stream to a file to save it
const destFile = await Deno.open(`./${name}.mp4`, {
  create: true,
  write: true,
  truncate: true,
});
await stream.pipeTo(destFile.writable);


function matchYoutubeUrl(url:string) {
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    // @ts-ignore
    return url.match(p)[1];
  }
  console.log("vid not found")
  Deno.exit()
}
