const iconTypes = {
  github: 'https://github.com/crallen',
  twitter: 'https://twitter.com/crallen',
  facebook: 'https://facebook.com/crallend',
  linkedin: 'https://www.linkedin.com/in/christopherallen/'
};

export default function SocialIcon(props) {
  const href = iconTypes[props.type];
  return (
    <div className="social-icon">
      <a href={href}>
        <i className={`bi bi-${props.type}`}></i>
      </a>
    </div>
  );
}
