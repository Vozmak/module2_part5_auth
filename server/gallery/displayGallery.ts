import {Request} from "express";
import { Images } from '../database/Models/Images.js';
import {Users} from "../database/Models/Users.js";

type LoginResponse = {
  errorMessage: string;
} | {
  objects: Array<string | null>;
  page: number;
  total: number;
}

interface Path {
  path: string | null;
}

async function displayGallery(req: Request): Promise<LoginResponse> {
  const { page = '1', limit = '0', filter } = req.params;
  const numberPage: number = Number(page);
  const numberLimit: number = Number(limit);

  let findFilter: object;

  if (filter !== 'null') {
    const id = await Users.findOne({email: filter}).lean();

    if (!id) return {
      errorMessage: `Пользователь ${filter} не зарегестрирован`,
    };

    findFilter = { imgCreator: id._id };
  } else {
    findFilter = {};
  }

  const pathImages: Array<Path> = await Images.find(findFilter,
    {
      _id: false,
      path: 1
    }).lean()
    .skip((numberPage - 1) * numberLimit)
    .limit(numberLimit);

  const totalCount = await Images.count(findFilter);
  const total: number = Math.ceil(totalCount /  (numberLimit ? numberLimit : totalCount));

  if (pathImages.length === 0) {
    return {
      errorMessage: `${filter} загрузил 0 картинок`
    };
  }

  if (numberPage > total || numberPage < 1) {
    return {
      errorMessage: 'Указаной страницы несуществует',
    };
  }

  const images = pathImages.map(img => img.path);

  return {
    objects: images,
    page: numberPage,
    total: total,
  };
}

export { displayGallery };

// Infinity load
