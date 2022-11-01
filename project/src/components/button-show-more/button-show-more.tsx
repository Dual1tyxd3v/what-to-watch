type ButtonShowMoreProps = {
  buttonClickHandler: () => void;
}

function ButtonShowMore({buttonClickHandler}: ButtonShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={buttonClickHandler}>Show more</button>
    </div>
  );
}

export default ButtonShowMore;
