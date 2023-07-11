import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import axios from 'axios';

const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

type ProductProps = {
  params: { productId: string };
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
  const product = (await getProduct(params.productId)) as any;
  console.log();
  console.log('here', product.fields.productDescription);
  console.log(documentToReactComponents(product.fields.productDescription));
  return <>{documentToReactComponents(product.fields.productDescription)}</>;

  // <>
  //   {/* <div>{product.fields.productName}</div> */}
  //   {documentToHtmlString(product.fields.productDescription)}
  // </>
};

export default product;
