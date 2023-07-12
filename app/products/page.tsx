import React from 'react';
import axios from 'axios';
import Link from 'next/link';

const BASE_URL = 'https://cdn.contentful.com';
const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

const getProducts = async () => {
  const result = (await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: `/spaces/${spaceID}/entries/?content_type=saltProducts&access_token=${API_KEY}`,
  })) as any;

  return result.data.items.map((product: any, i: number) => {
    return (
      <div key={product.fields.productName + i}>
        <Link data-testId="productLink" href={`/products/${product.sys.id}`}>
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
  const things = await getProducts();
  return <div>{things}</div>;
};

export default page;
