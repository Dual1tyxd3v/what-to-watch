import { ChangeEvent } from 'react';

type StarProps = {
  changeHandler: (evt: ChangeEvent<HTMLInputElement>) => void;
  rateValue: number;
}

function Star({changeHandler, rateValue}: StarProps): JSX.Element {
  return (
    <>
      <input onChange={changeHandler} className="rating__input" id={`star-${rateValue}`} type="radio" name="rating" value={rateValue} />
      <label className="rating__label" htmlFor={`star-${rateValue}`}>Rating {rateValue}</label>
    </>
  );
}

export default Star;
