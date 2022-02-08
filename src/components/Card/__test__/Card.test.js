import { render, screen } from '@testing-library/react';
import userEvents from "@testing-library/user-event";
import {PetsContext} from "../../Pets/Pets";
import cats from "../../../mocks/cats.json";
import Card from '../Card';

const cardProps = {
  name: 'Sidney',
  phone: '111-11-1111',
  email: 'sidney@gmail.com',
  image: {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'Cute cat',
  },
  favoured: false,
  index: 1
};

const renderCardComponentWithProvider = (props) => {
  render(<PetsContext.Provider value={{cats: cats, setCats: () => {}}}>
        <Card {...props} />
      </PetsContext.Provider>);
}


describe('Card component', () => {
  test('Should show the name of the cat', () => {
    renderCardComponentWithProvider(cardProps);
    expect(
      screen.getByRole('heading', {
        name: /sidney/i,
      }),
    ).toBeInTheDocument();
  });

  test('Should show the phone number', () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.getByText(/111-11-1111/i)).toBeInTheDocument();
  });

  test('Should show the email', () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.getByText(/sidney@gmail.com/i)).toBeInTheDocument();
  });

  test('Should show image with correct src', () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url)
  });

  test("Should show outlined heart", () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/oulined heart/i)).toBeInTheDocument();
  });

  test("Should show filled heart", () => {
    renderCardComponentWithProvider({...cardProps, favoured: true});
    expect(screen.queryByAltText(/oulined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("Should toggle heart status", () => {
    renderCardComponentWithProvider({...cardProps});
    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/oulined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/oulined heart/i)).toBeInTheDocument();
  })

});
