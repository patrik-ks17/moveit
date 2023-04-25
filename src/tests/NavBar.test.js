import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import NavBar from './../components/home/NavBar';

test("Navigation bar", () => {
	//render the component
	render(
		<NavBar />
	);

	//check if icons are in the document
	const icons = screen.getAllByRole('img')
	icons.forEach(icon => expect(icon).toBeInTheDocument())
})