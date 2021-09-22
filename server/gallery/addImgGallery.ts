import {Request} from 'express';
import {FileArray, UploadedFile} from "express-fileupload";
import * as fs from "fs";
import ErrnoException = NodeJS.ErrnoException;


async function addImgGallery(req: Request) {
    const formData: FileArray | undefined = req.files;
    const page = <string>req.params.page || '1';

    if (!formData || Object.keys(formData).length === 0) {
        return {
            errorMessage: 'Нет изображений для загрузки'
        };
    }

    let imgData: UploadedFile | Array<UploadedFile> = formData.photo;
    let responseImg: Array<string> = [];

    if (Array.isArray(imgData)) {
        for (const imgInfo of imgData) {
            try {
                await fs.writeFile(`server/gallery/images/${page}/${imgInfo.name}`, imgInfo.data, (err: ErrnoException | null) => {
                    if (err) {
                        throw err
                    }
                });
                responseImg.push(imgInfo.name);
            } catch (e) {
                console.log(e)
                responseImg.push(`${imgInfo.name} не было загружено`)
            }
        }
    } else {
        try {
            await fs.writeFile(`server/gallery/images/${page}/${imgData.name}`, imgData.data, (err: ErrnoException | null) => {
                if (err) {
                    throw err
                }
            });
            responseImg.push(imgData.name);
        } catch (e) {
            console.log(e)
            return {
                errorMessage: 'Ошибка загрузки'
            }
        }
    }

    return {
        message: 'Изображения успешно загружены',
        objects: responseImg,
    };
}

export {addImgGallery}
