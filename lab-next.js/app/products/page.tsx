import React from 'react';
import axios from 'axios';
import Link from 'next/link';

const BASE_URL = 'https://cdn.contentful.com';
const op = '';
const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

const BASE_IMAGE = `https://images.ctfassets.net/pary7vfe1hbq/4MNE230QVf8sxi2ZDzSakc/5e229104aa796cd58eff37463f2a0921/De3CsMmUwAEN0E2.png`;

const getProducs = async () => {
  const result = (await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: `/spaces/${spaceID}/entries/?content_type=saltProducts&access_token=${API_KEY}`,
  })) as any;

  // console.log(
  //   'This is the description field',
  //   result.data.items[0].fields.productDescription
  // );
  return result.data.items.map((product: any, i: number) => {
    console.log('this is the product', product.fields.productName);
    console.log(
      'This should be our boy',
      result.data.includes.Asset.find((possibleImage: any) => {
        return possibleImage.sys.id === product.fields.productImage.sys.id;
      }).fields.file.url
    );
    return (
      <div key={product.fields.productName + i}>
        <Link href={`/products/${product.sys.id}`}>
          <h1>{product.fields.productName}</h1>
          <p>{product.fields.description}</p>
          <img
            src={`https:${
              result.data.includes.Asset.find((possibleImage: any) => {
                return (
                  possibleImage.sys.id === product.fields.productImage.sys.id
                );
              }).fields.file.url
            }`}
          />
        </Link>
      </div>
    );
  });
};

const page = async () => {
  const things = await getProducs();
  return <div>{things}</div>;
};

export default page;
