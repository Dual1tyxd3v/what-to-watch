function ButtonPause(): JSX.Element {
  return (
    <>
      <svg viewBox="0 0 14 21" width="14" height="21" data-testid="pauseSvg">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </>
  );
}

export default ButtonPause;
