import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProfileEditing from "../components/profile/ProfileEditing";


describe('ProfileEditing', () => {
	test("form elements are in the document", () => {
		render(<ProfileEditing />);

		const exButton = screen.getByAltText(/exit button/i)
		const form = screen.getByTestId('editprofile-form')
		const inputs = form.querySelectorAll('input');
		const textbox = form.querySelector('textarea');
		const submitButton = form.querySelector('input[type="submit"]');

		expect(exButton).toBeInTheDocument();
		expect(form).toBeInTheDocument();
		expect(inputs.length).toBe(9);
		expect(textbox).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	})

});
