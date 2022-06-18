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
        <div className="copyright">&copy; {today.getFullYear()} Christopher R. Allen</div>
      </div>
    </footer>
  );
}
