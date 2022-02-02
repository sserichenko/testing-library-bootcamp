import { render, screen } from '@testing-library/react';
import userEvents from "@testing-library/user-event";
import Filter from "../Filter";

describe("Filter", () => {

    test("Should be able to change value of favourite select", () => {
        render(<Filter />);
        const select = screen.getByLabelText(/favourite/i);

        expect(select.value).toBe(/any/i);
        userEvents.selectOptions(select, "favourite");
        expect(select.value).toBe(/favourite/i);
    });

    // test("Should be able to change value of gender select", () => {
    //     render(<Filter />);
    //     const select = screen.getByLabelText(/gender/i);

    //     expect(select.value).toBe(/any/i);
    //     userEvents.selectOptions(select, "male");
    //     expect(select.value).toBe(/male/i);
    // })
})