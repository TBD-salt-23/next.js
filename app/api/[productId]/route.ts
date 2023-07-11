import { Product } from '@/app/db/db';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { connect } from 'mongoose';
import { CONNECTION } from '@/app/db/db';
type GetParams = {
  productId: string;
};

const getProductById = async (productId: string) => {
  try {
    await connect(CONNECTION);
    console.log('this is the product id we feed to mongoose', productId);

    // const res = await Products_Collection.findById(productId).exec();
    // const res = await PRODUCT.findById(productId);
    const res = await Product.findById(productId);
    console.log('here is our result!', res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const GET = async (
  req: NextApiRequest,
  context: { params: GetParams }
) => {
  const { productId } = context.params;
  console.log('Here comes the product id', productId);

  const res = await getProductById(productId);
  console.log('log in route', res);
  return NextResponse.json(res);
};
