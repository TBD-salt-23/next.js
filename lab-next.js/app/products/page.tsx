import React from 'react';
import axios from 'axios';

const BASE_URL = 'https://cdn.contentful.com';
const empty = '';
const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

const getProducs = async () => {
  const result = (await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: `/spaces/${spaceID}/environments/master/content_types?access_token=${API_KEY}`,
  })) as any;
  console.log(result.data.items[0].fields.join('\n'));
  return result.data.items[0].fields.map((product: any, i: number) => {
    return <p key={product.name + i}>{product.name}</p>;
  });
};

const page = async () => {
  const things = await getProducs();
  return <div>{things}</div>;
};

export default page;
