import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
        <div className="footer__column">
            <nav className="footer__nav">
                <ul className="footer__list">
                    <li className="footer__list-item"><a href="#" className="footer__link">About Us</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Support</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Blog</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Press</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Api</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Jobs</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Privacy</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Terms</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Directory</a></li>
                    <li className="footer__list-item"><a href="#" className="footer__link">Language</a></li>
                </ul>
            </nav>
        </div>
        <div className="footer__column">
            <span className="footer__copyright">© {new Date().getFullYear()} Chitraf</span>
        </div>
    </footer>
    )
}
