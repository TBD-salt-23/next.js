import React from 'react';

import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import axios from 'axios';

type ProductProps = {
  params: { productId: string };
};

const getProduct = async (productId: string) => {
  const res = (
    await axios({
      method: 'get',
      baseURL: 'https://cdn.contentful.com',
      url: `/spaces/pary7vfe1hbq/environments/master/entries/${productId}?access_token=ZVD2u8m2XQaqMtNFZ3x6oF7e0cbi_gU23w7-FKrUSjE`,
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
