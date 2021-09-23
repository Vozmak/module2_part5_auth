import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { fileMetadataAsync } from 'file-metadata';
import { Images } from '../mongoDB/Models/Images.js';
import { connectDb } from '../mongoDB/mongoDbConnect.js';

interface Image {
  path: string;
  metadata: object;
}

connectDb();

const readdir = util.promisify(fs.readdir);

addImagesToDb()
  .catch(e => {
    console.log(e);
  });

async function addImagesToDb() {
  const pathImages = await getAllImages();

  for (const pathImg of pathImages) {
    const resultFind = await Images.findOne({ path: pathImg.path });

    // console.log(resultFind);

    if (!resultFind) {
      await Images.create({ path: pathImg });
    }
  }
}

async function getAllImages(): Promise<Array<Image>> {
  const total: number = (await readdir(`server/gallery/images`)).length;

  let pathImages: Array<Image> = [];
  for (let i = 1; i <= total; i++) {
    const dirImages: Array<string> = await readdir(`server/gallery/images/${i}`);
    const images = dirImages.map( img => {
        console.log(fileMetadataAsync(img));
        }/*({
          path: path.join('http://127.0.0.1:2000', `images/${i}`, img),
          metadata: 1,
        }),*/
      );
    pathImages.push(...images);
  }

  return pathImages;
}
