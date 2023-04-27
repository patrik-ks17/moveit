import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Nav from "../components/Nav";
import { BrowserRouter } from "react-router-dom";


describe('Navigate to Home', () => {
	test("check if click event works", () => {
		render(
			<BrowserRouter>
				<Nav />
			</BrowserRouter>
		);
		const icon = screen.getByRole('img')
		const clickEvent = jest.fn();

		expect(icon).toBeInTheDocument()

		icon.addEventListener('click', clickEvent);
		fireEvent.click(icon)
		expect(clickEvent).toHaveBeenCalled()
	})
});

