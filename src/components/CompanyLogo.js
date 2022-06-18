const companies = {
  americommerce: {
    displayName: 'AmeriCommerce',
    href: 'https://americommerce.com',
    image: '/images/logos/americommerce.png'
  },
  capitalone: {
    displayName: 'Capital One',
    href: 'https://capitalone.com',
    image: '/images/logos/capitalone.png'
  },
  ufcu: {
    displayName: 'UFCU',
    href: 'https://ufcu.org',
    image: '/images/logos/ufcu.png'
  },
  fsg: {
    displayName: 'FSG Smart Buildings',
    href: 'https://fsgsmartbuildings.com',
    image: '/images/logos/fsgsb.png'
  },
  affinipay: {
    displayName: 'AffiniPay',
    href: 'https://affinipay.com',
    image: '/images/logos/affinipay.png'
  }
};

export default function CompanyLogo(props) {
  const company = companies[props.company];

  return (
    <a
      href={company.href}
      target="_blank"
      className={`company-logo ${props.company}`}
      role="img"
      aria-label={props.displayName}
      rel="noreferrer"
    >
      {props.displayName}
    </a>
  );
}
