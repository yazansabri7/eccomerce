import React from 'react'
import './footer.css'
import twitter from '../../../assets/twitter.svg'
import facebook from '../../../assets/facebook.svg'
import youtube from '../../../assets/youtube.svg'
import pintrest from '../../../assets/printrest.svg'
import instagram from '../../../assets/instagram.svg'

export default function Footer() {
  return (
    <>
    <section className='footer1 rounded shadow-sm py-5 mt-4 '>
        <div className="container footer d-flex gap-5 w-75 m-auto ">

        <div className="footer-first d-flex flex-column gap-5">
            <span className='text-uppercase fw-bold fs-5'>Swoo - 1st NYC tech online market</span>
            <div className="hotline d-flex flex-column gap-1">
                <span>HOTLINE 24/7</span>
                <span className='fs-3 fw-bold '>(025) 3686 25 16</span>
            </div>
            <div className="address d-flex flex-column gap-1">
                <span>257 Thatcher Road St, Brooklyn, Manhattan,
                NY 10092</span>
                <span>contact@Swootechmart.com</span>
            </div>
            <div className="social d-flex gap-1">
                <a href="#"><img src={twitter} alt="" /></a>
                <a href="#"><img src={facebook} alt="" /></a>
                <a href="#"><img src={instagram} alt="" /></a>
                <a href="#"><img src={youtube} alt="" /></a>
                <a href="#"><img src={pintrest} alt="" /></a>
            </div>
        </div>
        <div className="footer-last d-flex justify-content-between ">
            <div className="footer-last-item d-flex flex-column gap-4">
                <span className='text-uppercase fw-bold fs-5'>top Categories</span>
                <div className="gray d-flex flex-column gap-2">
                    <span>Laptops</span>
                    <span>PC & Computers</span>
                    <span>Cell Phones</span>
                    <span>Tablets</span>
                    <span>Gaming & VR</span>
                    <span>networks</span>
                    <span>Cameras</span>
                    <span>Sounds</span>
                    <span>Office</span>
                </div>
            </div>
            <div className="footer-last-item d-flex flex-column gap-4">
                <span className='text-uppercase fw-bold fs-5'>company</span>
                <div className="gray d-flex flex-column gap-2">
                    <span>About Swoo</span>
                    <span>Contact</span>
                    <span>Career</span>
                    <span>Blog</span>
                    <span>Sitemap</span>
                    <span>Store Locations</span>
                </div>
            </div>
            <div className="footer-last-item d-flex flex-column gap-4">
                <span className='text-uppercase fw-bold fs-5'>help center</span>
                <div className="gray d-flex flex-column gap-2">
                    <span>Customer Service</span>
                    <span>Policy</span>
                    <span>Terms & Conditions</span>
                    <span>Trach Order</span>
                    <span>FAQs</span>
                    <span>My Account</span>
                    <span>Product Support</span>
                </div>
            </div>
            <div className="footer-last-item d-flex flex-column gap-4">
                <span className='text-uppercase fw-bold fs-5'>partner</span>
                <div className="gray d-flex flex-column gap-2">
                    <span>Become Seller</span>
                    <span>Affiliate</span>
                    <span>Advertise</span>
                    <span>Partnership</span>
                </div>
            </div>

        </div>
        </div>
    </section>
    
    </>
  )
}
