import ContactForm from '../components/ContactForm';
import InnerLayout from '../layouts/InnerLayout';

export default function Contact() {
  return (
    <InnerLayout>
      <section id="contact">
        <div className="container">
          <h1>Contact Me</h1>
          <p>
            You can use the form below to send me a message directly, or use the links in the footer
            to find me on social media.
          </p>
          <ContactForm />
        </div>
      </section>
    </InnerLayout>
  );
}
