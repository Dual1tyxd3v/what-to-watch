import { render, screen } from '@testing-library/react';
import { formatDateForReview, formatRating } from '../../utils';
import { makeFakeComment } from '../../utils/mock';
import CommentCard from './comment-card';

const mockComment = makeFakeComment();

describe('Component: CommentCard', () => {
  it('should render correctly', () => {
    render(
      <CommentCard commentItem={mockComment} />
    );

    const formatedRating = formatRating(mockComment.rating);
    const formatedDate = formatDateForReview(mockComment.date);

    expect(screen.getByText(new RegExp(mockComment.comment))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockComment.user.name))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formatedRating))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formatedDate))).toBeInTheDocument();
  });
});
