import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import RegisterPage from './../pages/RegisterPage';

describe('Register page', () => {
	test("check if component rendered correctly", () => {
		render(<RegisterPage />);
		const form = screen.getByTestId("reg-form")
		const inputElements = screen.getAllByRole("textbox")
		const submit = screen.getByRole("button")
		const navigateTo = screen.getByTestId("navigate")

		expect(form).toBeInTheDocument()
		inputElements.forEach((element) => {
			expect(element).toBeInTheDocument()
		})
		expect(submit).toBeInTheDocument()
		expect(navigateTo).toBeInTheDocument()
		expect(navigateTo).toHaveClass('link-btn')
		expect(navigateTo).toHaveTextContent(/Van már fiókom./i)
	})
});

