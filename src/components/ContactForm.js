import ContactTextBox from './ContactTextBox';

export default function ContactForm() {
  return (
    <form netlify="true">
      <ContactTextBox type="text" name="name" label="Name" />
      <ContactTextBox type="email" name="email" label="Email" />
      <ContactTextBox type="textarea" name="message" label="Message" />
      <button type="submit">Send Message</button>
    </form>
  );
}
