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
        <div className='container'>
            <div className='left'>
                <form className="formContainer" onSubmit={handleOnSubmit} style={{ flex: '1' }}>
                    <h2>Contact Us</h2>
                    <div className="formElement">
                        <label htmlFor="from_name">Name</label>
                        <input type="text" id="from_name" name="from_name" placeholder="Your name.." required />
                    </div>

                    <div className="formElement">
                        <label htmlFor="from_email">E-mail</label>
                        <input type="email" id="from_email" name="from_email" placeholder="Your email.." required />
                    </div>

                    <div className="formElement">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="8" cols="30" placeholder="Your message.." required></textarea>
                    </div>
                    <button type='submit' className='formButton'>Submit</button>
                </form>
            </div>
            <div className='right'>
                <img src='../assets/contact.jpg' className='image'></img>
            </div>
        </div>
    )
}

export default ContactForm;