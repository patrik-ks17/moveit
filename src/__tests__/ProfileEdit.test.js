import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProfile from '../services/EditProfile';
import ProfileEditing from '../components/profile/ProfileEditing';
import { HookContext, UserContext } from '../context/Context';
import { useForm } from 'react-hook-form';


// mock the services/EditProfile.js module
jest.mock('../services/EditProfile', () => ({
	__esModule: true,
	default: jest.fn(),
}));

// mock the useForm() hook
jest.mock('react-hook-form', () => ({
	useForm: jest.fn(() => ({
	  register: jest.fn(),
	  handleSubmit: jest.fn(),
	})),
	// add console.log statement here
	
	__esModule: true,
 }));

describe('ProfileEditing', () => {
	const setIsEditing = jest.fn();
	const alert = jest.fn();
	const profileInfo = {
		nickname: 'John Doe',
		profession: 'Software Developer',
		info: 'Lorem ipsum dolor sit amet',
		social: {
			tiktok: 'https://www.tiktok.com/@johndoe',
			twitter: 'https://twitter.com/johndoe',
			instagram: 'https://www.instagram.com/johndoe/',
			facebook: 'https://www.facebook.com/johndoe',
			linkedin: 'https://www.linkedin.com/in/johndoe/',
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should submit the form with updated profile information', async () => {
		// set up the context providers
		const userContext = { profileInfo, setIsEditing };
		const hookContext = { alert };
		render(
			<UserContext.Provider value={userContext}>
				<HookContext.Provider value={hookContext}>
					<ProfileEditing />
				</HookContext.Provider>
			</UserContext.Provider>
		);

		// fill out the form
		const nicknameInput = screen.getByLabelText('Nickname:');
		const professionInput = screen.getByLabelText('Foglalkozás:');
		const infoTextarea = screen.getByLabelText('Leírás:');
		const tiktokInput = screen.getByLabelText('Tiktok:');
		const twitterInput = screen.getByLabelText('Twitter:');
		const instagramInput = screen.getByLabelText('instagram:');
		const facebookInput = screen.getByLabelText('Facebook:');
		const linkedinInput = screen.getByLabelText('Likedin:');
		const submitButton = screen.getByText('Módosítás');
		fireEvent.change(nicknameInput, { target: { value: 'Jane Doe' } });
		fireEvent.change(professionInput, { target: { value: 'Web Developer' } });
		fireEvent.change(infoTextarea, { target: { value: 'Dolor sit amet' } });
		fireEvent.change(tiktokInput, {
			target: { value: 'https://www.tiktok.com/@janedoe' },
		});
		fireEvent.change(twitterInput, {
			target: { value: 'https://twitter.com/janedoe' },
		});
		fireEvent.change(instagramInput, {
			target: { value: 'https://www.instagram.com/janedoe/' },
		});
		fireEvent.change(facebookInput, {
			target: { value: 'https://www.facebook.com/janedoe' },
		});
		fireEvent.change(linkedinInput, {
			target: { value: 'https://www.linkedin.com/in/janedoe/' },
		});

		// mock the return value of the EditProfile service
		EditProfile.mockResolvedValueOnce();

		// submit the form
		fireEvent.click(submitButton);

		expect(useForm().register).toHaveBeenCalledWith('Nickname');
	})
})