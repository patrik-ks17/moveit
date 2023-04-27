import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import NavBar from '../components/home/NavBar';
import { clear } from "@testing-library/user-event/dist/types/utility";

describe('Navigation bar', () => {
	test("check if icons are in document", () => {
		render(<NavBar />);
		const icons = screen.getAllByRole('img')
		icons.forEach(icon => {
			expect(icon).toBeInTheDocument()
		})
	})
});

