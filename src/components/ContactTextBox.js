export default function ContactTextBox(props) {
  const type = props.type || 'text';

  const TextField = () => {
    if (type === 'textarea') {
      return <textarea name={props.name} />;
    } else {
      return <input name={props.name} type={type} />;
    }
  };

  return (
    <div className="contact-field">
      <label htmlFor={props.name}>{props.label}</label>
      <TextField />
    </div>
  );
}
