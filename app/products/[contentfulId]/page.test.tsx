import axios from 'axios';
import { getQuantity } from './page';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getProductById } from '@/app/api/[productId]/route';
import { getProduct } from './page';
import { expect } from '@jest/globals';

const BASE_URL = 'http://localhost:3000/api';

const spaceID = process.env.SPACE_ID;
const API_KEY = process.env.API_KEY;

// jest.mock('axios');
const server = setupServer(
  rest.get(`${BASE_URL}/64ad26680bb21022ce3c1f5d`, (req, res, ctx) => {
    return res(ctx.json(-555));
  }),
  rest.get(
    `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/2WK3J7codiSXUAJPNBq6Mm?access_token=${API_KEY}`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          metadata: { tags: [] },
          sys: {
            space: { sys: [Object] },
            id: '2WK3J7codiSXUAJPNBq6Mm',
            type: 'Entry',
            createdAt: '2023-07-10T12:22:34.035Z',
            updatedAt: '2023-07-12T13:03:39.057Z',
            environment: { sys: [Object] },
            revision: 11,
            contentType: { sys: [Object] },
            locale: 'en-US',
          },
          fields: {
            productName: 'Cowboy Hat',
            productDescription: {
              nodeType: 'document',
              data: {},
              content: [Array],
            },
            productImage: { sys: [Object] },
            slug: 'cowboy-hat',
            productId: '64ad26680bb21022ce3c1f5d',
          },
        })
      );
    }
  )
);

describe('<FancyComponentWithAPICall />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  test('Tests getQuantity', async () => {
    const result = await getQuantity('64ad26680bb21022ce3c1f5d');

    expect(result).toEqual(-555);
    // Render components, perform requests, receive mocked responses.
  });
  test('Tests getProduct', async () => {
    const result = await getProduct('2WK3J7codiSXUAJPNBq6Mm');

    expect(result.fields.productName).toEqual('Cowboy Hat');
    // Render components, perform requests, receive mocked responses.
  });
});

describe('Axios tests', () => {
  it('Should return quantity', async () => {
    const product = {
      id: '64ad26680bb21022ce3c1f5d',
      name: 'Cowboy Hat',
      quantity: 555,
    };
  });
});
