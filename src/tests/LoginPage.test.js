import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import LoginPage from './../pages/LoginPage';

test("Navigation bar", () => {
	//render the component
	render(
		<LoginPage/>
	);


	const inputs = screen.getAllByRole('input');
	const labels = screen.getAllByRole('label');
	const link = screen.

	inputs.forEach(input => expect(input).toBeInTheDocument)

})