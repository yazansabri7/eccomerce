import React from 'react'
import { Container, FloatingLabel, Form } from 'react-bootstrap'
import twitter from '../../../assets/twitter.svg'
import facebook from '../../../assets/facebook.svg'
import youtube from '../../../assets/youtube.svg'
import pintrest from '../../../assets/printrest.svg'
import instagram from '../../../assets/instagram.svg'
import './contact.css';
import lapImg from '../../../assets/contact.png'
import emailjs from '@emailjs/browser';

export default function Contact() {

    const sendEmail =(e) => {
        e.preventDefault();
        emailjs.sendForm('service_poknepr', 'template_uzpvlo1', e.target, 'KwPKLbvQrftXoP1nm' );
    }
  return (
    <Container className='py-5'>
        <section className='contact d-flex justify-content-between gap-2'>
            <div className="form col-6 ">
                <Form className='d-flex flex-column gap-5 ' onSubmit={sendEmail}>
                <FloatingLabel controlId="floatingPassword" label="Name" >
                    <Form.Control type="text" placeholder="Password"  name='name_from'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Email">
                    <Form.Control type="email" placeholder="Password" name='email_from' />
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    name='textarea_from'
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <button className='clearBtn2' type='submit'>Send</button>
                   
                </Form>
            </div>
            <div className="status col-6 d-flex flex-column gap-2">
                <div className="head d-flex flex-column gap-4">
                    <span className='text-secondary text-uppercase'>united states (head quater)</span>
                    <div className="road d-flex flex-column gap-2">
                        <span>152 Thatcher Road St, Mahattan, 10463, US</span>
                        <span>(+025) 3886 25 16</span>
                        <span>hello@swattechmart.com</span>
                    </div>
                    <div className="social d-flex gap-1">
                                    <a href="#"><img src={twitter} alt="" /></a>
                                    <a href="#"><img src={facebook} alt="" /></a>
                                    <a href="#"><img src={instagram} alt="" /></a>
                                    <a href="#"><img src={youtube} alt="" /></a>
                                    <a href="#"><img src={pintrest} alt="" /></a>
                    </div>
                </div>
                <div className="img-lap">
                    <img src={lapImg} alt="" className='w-100'/>
                </div>
            </div>
        </section>
    </Container>
  )
}
