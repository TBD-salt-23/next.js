import axios from 'axios';
import { getQuantity } from './page';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getProductById } from '@/app/api/[productId]/route';

const BASE_URL = 'http://localhost:3000/api';

// jest.mock('axios');

const server = setupServer(
  rest.get(`${BASE_URL}/64ad26680bb21022ce3c1f5d`, (req, res, ctx) => {
    return res(ctx.json(-555));
  })
);

describe('<FancyComponentWithAPICall />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  test('displays data from backend', async () => {
    const result = await getQuantity('64ad26680bb21022ce3c1f5d');

    expect(result).toEqual(-555);
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
