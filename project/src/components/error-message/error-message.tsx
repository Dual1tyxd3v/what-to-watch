import { useAppSelector } from '../../hooks';
import { getError } from '../../store/app-process/selectors';
import './error-message.css';

function ErrorMessage(): JSX.Element | null{
  const error = useAppSelector(getError);
  return error
    ? <p className='error-message'>{error}</p>
    : null;
}

export default ErrorMessage;
