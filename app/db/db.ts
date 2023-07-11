import {
  Schema,
  model,
  models,
  connect,
  ConnectionStates,
  ObjectId,
} from 'mongoose';

const CREDENTIALS = process.env.CREDENTIALS;
export const CONNECTION = `mongodb+srv://${CREDENTIALS}@salt-things.9y2hgm9.mongodb.net/products-database?retryWrites=true&w=majority`;

type ProductT = {
  name: string;
  quantity: number;
};

const productSchema = new Schema<ProductT>({
  name: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Product =
  models.product || model<ProductT>('product', productSchema);
