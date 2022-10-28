import { useState, ChangeEvent, useCallback } from 'react';
import { ratingValues } from '../../const';
import Star from '../star/star';

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({rate: 0, comment: ''});
  function changeTextHandler(evt: ChangeEvent<HTMLTextAreaElement>) {
    setFormData({...formData, comment: evt.target.value});
  }
  const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rate: +evt.target.value});
  }, [formData]);

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {
            ratingValues.map((rateValue) => <Star key={`star_${rateValue}`} changeHandler={changeHandler} rateValue={rateValue}/>)
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={changeTextHandler}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
