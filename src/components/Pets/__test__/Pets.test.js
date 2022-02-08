import { render, screen, within } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Pets from '../Pets';
import catsMock from '../../../mocks/cats.json';

const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  }),
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  render(<Pets />);
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Pets', () => {
  test('Should render the correct amount of cards', async () => {
    const cards = await screen.findAllByRole('article');
    expect(cards.length).toBe(5);
  });

  test('Should filter for male cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvents.selectOptions(screen.getByLabelText(/gender/i), 'male');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[1], cards[3]]);
  });

  test('Should filter for female cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvents.selectOptions(screen.getByLabelText(/gender/i), 'female');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[2], cards[4]]);
  });

  test('Should filter for the favoured cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvents.click(within(cards[0]).getByRole('button'));
    userEvents.click(within(cards[3]).getByRole('button'));

    userEvents.selectOptions(screen.getByLabelText(/favourite/i), 'favoured');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[3]]);
  });

  test('Should filter the NOT favoured cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvents.click(within(cards[1]).getByRole('button'));
    userEvents.click(within(cards[2]).getByRole('button'));
    userEvents.click(within(cards[4]).getByRole('button'));
    userEvents.selectOptions(screen.getByLabelText(/favourite/i), 'not favoured');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[3]]);
  });

  test("Shoud filter for favoured male cats", async () => {
    const cards = await screen.findAllByRole('article');
    userEvents.click(within(cards[0]).getByRole('button'));
    userEvents.click(within(cards[3]).getByRole('button'));
    userEvents.selectOptions(screen.getByLabelText(/favourite/i), 'favoured');
    userEvents.selectOptions(screen.getByLabelText(/gender/i), 'male');
    expect(screen.getAllByRole('article')).toStrictEqual([cards[3]]);
  })
});
