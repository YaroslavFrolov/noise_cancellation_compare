export const StartButton = ({ isPlaying, handlerClick, name }) => {
  return isPlaying === name ? (
    <>
      <span className="say">
        ... now say something, also try to enable some fan or hair-dryer near
        you ...
      </span>{" "}
      <button onClick={() => window.location.reload(true)}>reload</button>
    </>
  ) : (
    <button disabled={isPlaying} onClick={handlerClick}>
      start
    </button>
  );
};
