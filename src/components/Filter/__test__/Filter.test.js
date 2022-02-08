import { render, screen } from '@testing-library/react';
import userEvents from "@testing-library/user-event";
import Filter from "../Filter";

beforeEach(() => {
    render(<Filter filters={{}} setFilters={() => {}}/>);
})

describe("Filter", () => {

    test("Should be able to change value of favourite select", () => {
        const select = screen.getByLabelText(/favourite/i);

        expect(select.value).toBe("any");
        userEvents.selectOptions(select, "favoured");
        expect(select.value).toBe("favoured");
    });

    test("Should be able to change value of gender select", () => {
        const select = screen.getByLabelText(/gender/i);

        expect(select.value).toBe("any");
        userEvents.selectOptions(select, "male");
        expect(select.value).toBe("male");
    })
})