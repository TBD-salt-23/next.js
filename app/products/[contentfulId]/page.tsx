import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import axios from 'axios';
import { log } from 'console';

const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

type ProductProps = {
  params: { contentfulId: string };
};
export const getQuantity = async (productId: string) => {
  try {
    const res = await axios({
      method: 'get',
      url: `http://localhost:3000/api/${productId}`,
    });
    console.log('tyyype', typeof res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (productId: string) => {
  try {
    const res = (
      await axios({
        method: 'get',
        baseURL: 'https://cdn.contentful.com',
        url: `/spaces/${spaceID}/environments/master/entries/${productId}?access_token=${API_KEY}`,
      })
    ).data;

    return res;
  } catch (error) {
    console.log(error);
  }
};

const product = async ({ params }: ProductProps) => {
  const product = (await getProduct(params.contentfulId)) as any;
  const quantity = await getQuantity(product.fields.productId);
  console.log();
  console.log('here', product.fields.productDescription);
  console.log('hopefully this is the id', product.fields.productId);

  return (
    <>
      {documentToReactComponents(product.fields.productDescription)}
      <p>Quantity: {quantity}</p>
    </>
  );
};

export default product;
