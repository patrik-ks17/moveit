import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProfileEditing from "../components/profile/ProfileEditing";


describe('ProfileEditing', () => {
	test("", () => {
		const {result} = render(<ProfileEditing />);
		console.log(result);

		const profileDiv = screen.getByTestId("profile-details")
		const socialList = screen.getByRole("list")

		expect(profileDiv).toBeInTheDocument();
		expect(socialList).toBeInTheDocument();
		expect(socialList.children).toHaveLength(5);
	})
});
