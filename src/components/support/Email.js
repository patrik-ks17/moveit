import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';

function Email() {
	const LoggedUser = window.localStorage.getItem("loggedIn")

	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();
		emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
			.then((result) => {
				console.log(result.text);
			}, (error) => {
				console.log(error.text);
			});
		e.target.reset();
	};

	return (
		<div className='send-email'>
			<form ref={form} onSubmit={(e) => sendEmail(e)} className='email-form'>
				<label htmlFor="from_email">Küldő</label>
				<input type='email' name="from_email" defaultValue={LoggedUser !== "false" ? LoggedUser : ""} placeholder="email@gmail.com" required />
				<label htmlFor="subject">Tárgy</label>
				<input type="text" name="subject" required />
				<label htmlFor="message">Üzenet</label>
				<textarea name="message" cols="30" rows="5" required></textarea>
				<input type="submit" className='submit-btn' value={"Küldés"}/>
			</form>
		</div>
	)
}

export default Email