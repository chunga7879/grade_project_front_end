import logo from '../images/chunga_logo.png';

export default function Footer() {
    return (
        <footer>
            <div className="inner">
                <div className="info">
                    <span>(Owner)Chunga Lee</span>
                    <span>TEL : 778) 873-8528</span>
                    <span>EMAIL : chunga7879@gmail.com</span>
                </div>

                <p className="copyright">
                    &copy; Chunga Lee. All Rights Reserved.
                </p>
                <img src={logo} alt="CHUNGA LEE" className="logo"/>

            </div>
        </footer>
    );
}
