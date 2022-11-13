function ButtonPlay(): JSX.Element {
  return (
    <>
      <svg viewBox="0 0 19 19" width="19" height="19" data-testid="playSvg">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </>
  );
}

export default ButtonPlay;
