import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import LoginPage from "../pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

describe('Login page', () => {
	test("check if component rendered correctly", () => {
		render(<BrowserRouter>
		<LoginPage />
		</BrowserRouter>);
		const form = screen.getByTestId("login-form")
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
		expect(navigateTo).toHaveTextContent(/Nincs még fiókom./i)
	})
});

