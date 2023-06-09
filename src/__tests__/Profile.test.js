import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Profile from "../components/profile/Profile";

describe('Profile page', () => {
	test("profile info are in the document", () => {
		render(<Profile />);

		const profileDiv = screen.getByTestId("profile-details")
		const socialList = screen.getByRole("list")

		expect(profileDiv).toBeInTheDocument();
		expect(socialList).toBeInTheDocument();
		expect(socialList.children).toHaveLength(5);
	})
});
