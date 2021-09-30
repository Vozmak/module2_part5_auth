interface Image {
  path: string;
  metadata: object;
  imgCreator: mongoose.Schema.Types.ObjectId;
}

import mongoose from 'mongoose';

const ImageScheme = new mongoose.Schema<Image>({
  path: {
    type: String,
    required: true,
  },
  metadata: {
    type: Object,
    required: true
  },
  imgCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
});

const Images = mongoose.model('Images', ImageScheme, 'Images');

export { Images };
