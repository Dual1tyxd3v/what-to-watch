import { useAppSelector } from '../../hooks';
import './error-message.css';

function ErrorMessage(): JSX.Element | null{
  const {error} = useAppSelector((state) => state);
  return error
    ? <p className='error-message'>{error}</p>
    : null;
}

export default ErrorMessage;
