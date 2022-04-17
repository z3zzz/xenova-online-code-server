import "./icon-button.css"

type iconTypes = "up" | "down" | "x";

interface IconButtonProps {
  onClick: () => void;
  type: iconTypes;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, type }) => {
  const getClassName = (type: iconTypes) => {
    if (type === "up") {
      return "fas fa-arrow-up";
    }
    if (type === "down") {
      return "fas fa-arrow-down";
    }
    if (type === "x") {
      return "fas fa-times";
    }
  };

  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={getClassName(type)}></i>
      </span>
    </button>
  );
};

export default IconButton;
