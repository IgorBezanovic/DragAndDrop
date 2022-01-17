import "./style.css";

const Popup = ({
  title,
  content,
  handleClose,
}: {
  title: string;
  content: string | {};
  handleClose: () => void;
}) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h4>{title}</h4>
        <p>{content}</p>
        <button onClick={handleClose} className="submit close">Close</button>
      </div>
    </div>
  );
};

export default Popup;
