import SocialIcon from './SocialIcon';

export default function Footer() {
  const today = new Date();

  return (
    <footer>
      <div className="container">
        <div className="social">
          <SocialIcon type="github" />
          <SocialIcon type="twitter" />
          <SocialIcon type="facebook" />
          <SocialIcon type="linkedin" />
        </div>
        <div className="copyright">
          <p>&copy; {today.getFullYear()} Christopher R. Allen</p>
          <p>
            All images are copyright their respective owners and are protected under copyright laws.
            All trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
