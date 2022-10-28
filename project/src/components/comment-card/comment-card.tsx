import { Comment } from '../../types/comments';
import { formatDateForReview, formatRating } from '../../utils';

type CommentCardProps = {
  commentItem: Comment;
}

function CommentCard({commentItem}: CommentCardProps): JSX.Element {
  const {comment, user, rating, date} = commentItem;
  const foramtedRating = formatRating(rating);
  const formatedDate = formatDateForReview(date);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">{formatedDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{foramtedRating}</div>
    </div>
  );
}

export default CommentCard;
