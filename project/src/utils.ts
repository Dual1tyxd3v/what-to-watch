import { TextRating } from './const';

export function formatRatingToText(rating: number): string | void{
  if (rating === 10) {
    return TextRating.Awesome;
  } else if (rating >= 0 && rating < 3) {
    return TextRating.Bad;
  } else if (rating >=3 && rating < 5) {
    return TextRating.Normal;
  } else if (rating >=5 && rating < 8) {
    return TextRating.Good;
  } else if (rating >=8 && rating < 10) {
    return TextRating.VeryGood;
  }
}

export function formatRating(rating: number): string {
  if (rating === 10) {
    return rating.toString();
  }
  const stringRating = rating.toString().replace('.', ',');
  return stringRating.length > 2 ? stringRating : `${stringRating},0`;
}
