import { useState, ChangeEvent, useCallback, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingValues } from '../../const';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../services/api-actions';
import { getIsPostLoading } from '../../store/data-process/selectors';
import Star from '../star/star';

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({rate: 0, comment: ''});
  const isPostLoading = useAppSelector(getIsPostLoading);
  const dispatch = useAppDiapatch();
  const params = useParams();
  const paramsId = params.id;

  function changeTextHandler(evt: ChangeEvent<HTMLTextAreaElement>) {
    setFormData({...formData, comment: evt.target.value});
  }
  const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rate: +evt.target.value});
  }, [formData]);

  function submitHandler(evt: FormEvent) {
    evt.preventDefault();
    if (paramsId) {
      dispatch(postCommentAction({
        comment: formData.comment,
        rating: formData.rate,
        id: paramsId
      }));
    }
  }
  return (
    <form action="#" className="add-review__form" onSubmit={submitHandler}>
      <div className="rating">
        <div className="rating__stars">
          {
            ratingValues.map((rateValue) => <Star key={`star_${rateValue}`} changeHandler={changeHandler} rateValue={rateValue}/>)
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text" id="review-text"
          placeholder="Review text"
          onChange={changeTextHandler}
          disabled={isPostLoading}
        >
        </textarea>
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={isPostLoading || formData.rate === 0 || formData.comment.length < MIN_COMMENT_LENGTH || formData.comment.length > MAX_COMMENT_LENGTH}
          >Post
          </button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
