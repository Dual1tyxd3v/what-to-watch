import { Months, TextRating } from './const';

export function formatRatingToText(rating: number): string | void{
  if (rating === 10) {
    return TextRating.Awesome;
  } else if (rating >= 0 && rating < 3) {
    return TextRating.Bad;
  } else if (rating >= 3 && rating < 5) {
    return TextRating.Normal;
  } else if (rating >= 5 && rating < 8) {
    return TextRating.Good;
  } else if (rating >= 8 && rating < 10) {
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

export function formatRunTime(time: number): string {
  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;
  return `${hours}h ${minutes}m`;
}

export function formatRunTimeToPlayer(time: number): string {
  const roundedTime = Math.round(time);
  const hours = Math.floor(roundedTime / 3600);
  const minutes = Math.floor((roundedTime - hours * 3600) / 60);
  const seconds = roundedTime - hours * 3600 - minutes * 60;
  const formatedMinutes = minutes.toString().length > 1 ? minutes : minutes.toString().padStart(2, '0');
  const formatedSeconds = seconds.toString().length > 1 ? seconds : seconds.toString().padStart(2, '0');
  return `${hours}:${formatedMinutes}:${formatedSeconds}`;
}

export function formatDateForReview(date: string): string {
  const dateItem = new Date(date);
  const month = Months[dateItem.getMonth()];
  const day = dateItem.getDay();
  const year = dateItem.getFullYear();
  return `${month} ${day}, ${year}`;
}
