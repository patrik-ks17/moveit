import "../assets/style/support/supp.css"
import React from 'react'
import Email from '../components/support/Email';
import Nav from '../components/Nav';

function SupportPage() {
  return (
	<div className="back-support-page">
	<div>
	  <Nav />
	  <div className='support-page w-10/12 lg:w-4/12'>
		 <h1>Ügyfélszolgálat</h1>
		 <Email/>
	  </div>
	</div>
 </div>
  )
}

export default SupportPage