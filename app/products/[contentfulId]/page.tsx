import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import axios from 'axios';

const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

type ProductProps = {
  params: { contentfulId: string };
};
//64ad26680bb21022ce3c1f5d
const getQuantity = async (productId: string) => {
  const res = await axios({
    method: 'get',
    url: `http://localhost:3000/api/${productId}`,
  });
  console.log(res.data);
  return res.data;
};

const getProduct = async (productId: string) => {
  const res = (
    await axios({
      method: 'get',
      baseURL: 'https://cdn.contentful.com',
      url: `/spaces/${spaceID}/environments/master/entries/${productId}?access_token=${API_KEY}`,
    })
  ).data;

  return res;
};

// const options = {
//   renderMark: {
//     [MARKS.BOLD]: (text) => `<custom-bold>${text}<custom-bold>`,
//   },
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (node, next) =>
//       `<custom-paragraph>${next(node.content)}</custom-paragraph>`,
//   },
// };

const product = async ({ params }: ProductProps) => {
  const product = (await getProduct(params.contentfulId)) as any;
  const quantity = getQuantity(product.fields.productId);
  console.log();
  console.log('here', product.fields.productDescription);
  console.log('hopefully this is the id', product.fields.productId);

  // console.log(documentToReactComponents(product.fields.productDescription));
  return (
    <>
      {documentToReactComponents(product.fields.productDescription)}
      <p>Quantity: {quantity}</p>
    </>
  );

  // <>
  //   {/* <div>{product.fields.productName}</div> */}
  //   {documentToHtmlString(product.fields.productDescription)}
  // </>
};

export default product;
