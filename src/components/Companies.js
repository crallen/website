import CompanyLogo from './CompanyLogo';

export default function Companies() {
  return (
    <section id="companies">
      <div className="container">
        <h2>Places I&apos;ve Worked</h2>
        <div className="company-list">
          <CompanyLogo company="affinipay" />
          <CompanyLogo company="fsg" />
          <CompanyLogo company="ufcu" />
          <CompanyLogo company="capitalone" />
          <CompanyLogo company="americommerce" />
        </div>
      </div>
    </section>
  );
}
