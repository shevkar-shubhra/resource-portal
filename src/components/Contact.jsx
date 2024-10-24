import React from 'react'
import emailjs from 'emailjs-com';
import './Contact.css'

const SERVICE_ID = "service_2ffjlhl";
const TEMPLATE_ID = "template_pixgoz3";
const PUBLIC_KEY = "FmYQjyejl0M5Ns0UT";

const ContactForm = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                alert('Message Sent Successfully')
            }, (error) => {
                console.log(error.text);
                alert('Something went wrong!')
            });
        e.target.reset()
    };
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <form class="formContainer" onSubmit={handleOnSubmit}>
                <h2>Contact Us</h2>
                <div class="formElement">
                    <label for="from_name">Name</label>
                    <input type="text" id="from_name" name="from_name" placeholder="Your name.." required />
                </div>

                <div class="formElement">
                    <label>E-mail</label>
                    <input type="email" id="from_email" name="from_email" placeholder="Your email.." required />
                </div>

                <div class="formElement">
                    <label for="message">Message</label>
                    <textarea name="message" rows="8" cols="30" placeholder="Your message.." required />
                </div>
                <button type='submit' className='formButton'>Submit</button>
            </form>
        </div >
    )
}

export default ContactForm;