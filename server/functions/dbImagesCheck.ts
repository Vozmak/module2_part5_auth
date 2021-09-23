import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { logger } from '../logger/logger.js';
import { Images } from '../mongoDB/Models/Images.js';
// @ts-ignore
import { fileMetadataAsync } from 'file-metadata';

interface Image {
  path: string;
  metadata: object;
}

const readdir = util.promisify(fs.readdir);

async function addImagesToDb(host: string): Promise<void> {
  const pathImages = await getImagesInfoServer(host);

  for (const pathImg of pathImages) {
    const resultFind = await Images.findOne({ path: pathImg.path });

    if (!resultFind) {
      await Images.create(pathImg);
      logger(`Add ${pathImg.path} to db`)
    }
  }
}

async function getImagesInfoServer(host: string): Promise<Array<Image>> {
  const total: number = (await readdir(`server/gallery/images`)).length;

  let pathImages: Array<Image> = [];
  for (let i = 1; i <= total; i++) {
    const imagesDir: Array<string> = await readdir(`server/gallery/images/${i}`);
    const imagesDirInfo = imagesDir.map( async img => {
      const metadata = await fileMetadataAsync(`server/gallery/images/${i}/${img}`)
        return {
          path: path.join(host, `images/${i}`, img),
          metadata: metadata,
        }
        }
      );
    const resolveImages = await Promise.all(imagesDirInfo);
    pathImages.push(...resolveImages);
  }

  return pathImages;
}

export { addImagesToDb }
