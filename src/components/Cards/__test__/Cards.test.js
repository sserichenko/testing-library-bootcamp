import { render, screen } from '@testing-library/react';
import Cards from '../Cards';
import {PetsContext} from "../../Pets/Pets";
import cats from "../../../mocks/cats.json";

describe("Cards", () => {
    test("Should render five card components", () => {
        render(
            <PetsContext.Provider value={{cats: cats, setCats: () => {}}}>
                <Cards />
            </PetsContext.Provider>
        )
        expect(screen.getAllByRole("article").length).toBe(5)
    })
})