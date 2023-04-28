import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import MapPage from "../pages/MapPage";
import { HookContext } from "../context/Context";


describe('Map Page', () => {
	test("panel switcher in document", async () => {
		render(<HookContext.Provider value={{ alert }}>
			<MapPage />
		</HookContext.Provider>);

		const switcher = await waitFor(() => screen.getByTestId('rbtn'));
		expect(switcher).toBeInTheDocument()
	})
});

