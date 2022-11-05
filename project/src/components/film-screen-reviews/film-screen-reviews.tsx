import { Comments } from '../../types/comments';
import CommentCard from '../comment-card/comment-card';

type FilmScreenReviewsProps = {
  comments: Comments;
}

function FilmScreenReviews({comments}: FilmScreenReviewsProps): JSX.Element {
  const rightColComments: Comments = [];
  const leftColComments: Comments = [];

  comments.forEach((comment, i) => {
    if (i % 2 === 0) {
      leftColComments.push(comment);
    } else {
      rightColComments.push(comment);
    }
  });
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          leftColComments.map((commentItem, i) => {
            const key = `leftComment_${i}`;
            return <CommentCard key={key} commentItem={commentItem} />;
          })
        }
      </div>
      <div className="film-card__reviews-col">
        {
          rightColComments.map((commentItem, i) => {
            const key = `rightComment_${i}`;
            return <CommentCard key={key} commentItem={commentItem} />;
          })
        }
      </div>
    </div>
  );
}

export default FilmScreenReviews;
