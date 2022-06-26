import DefaultLayout from './DefaultLayout';
import Header from '../components/Header';

export default function InnerLayout(props) {
  return (
    <DefaultLayout>
      <Header />
      {props.children}
    </DefaultLayout>
  );
}
