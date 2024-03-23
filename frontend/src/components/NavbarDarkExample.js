import { useState, useEffect } from "react";
import VuiButton from "components/VuiButton";

const NavbarDarkExample = ({ options, onSelect, label }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <VuiButton
        color="white"
        variant="outlined"
        fullWidth
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ fontSize: 18 }}>
          {selectedOption ? selectedOption.label : "Select " + label}
        </div>
      </VuiButton>
      <div style={{color: "white"}}>
        {isOpen && (
          <ul>
            {options.map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarDarkExample;
