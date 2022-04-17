import "./icon-button.css";

type iconTypes = "up" | "down" | "x" | "+";

interface IconButtonProps {
  onClick: () => void;
  icon: iconTypes;
  buttonRound?: boolean;
  iconSmall?: boolean;
  extraText?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  buttonRound,
  iconSmall,
  extraText,
}) => {
  const getBtnClass = () => {
    const defaults = "button is-primary is-small";
    let option = "";
    if (buttonRound) {
      option += " is-rounded";
    }

    return defaults + option;
  };

  const getSpanClass = () => {
    const defaults = "icon";
    let option = "";
    if (iconSmall) {
      option += " is-small";
    }

    return defaults + option;
  };

  const getIClass = (icon: iconTypes) => {
    switch (icon) {
      case "up":
        return "fas fa-arrow-up";
      case "down":
        return "fas fa-arrow-down";
      case "x":
        return "fas fa-times";
      case "+":
        return "fas fa-plus";
    }
  };

  return (
    <button className={getBtnClass()} onClick={onClick}>
      <span className={getSpanClass()}>
        <i className={getIClass(icon)}></i>
      </span>
      {extraText && <span>{extraText}</span>}
    </button>
  );
};

export default IconButton;
