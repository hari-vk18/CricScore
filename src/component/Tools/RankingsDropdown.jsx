import React from 'react';
import './RankingsDropdown.css';

const RankingsDropdown = ({ options, subOptions, selectedOption, onMainSelect, onSubSelect }) => {
    return (
        <div className="rankings-dropdown">
            {options.map((option, index) => (
                <div key={index} className="rankings-option" onClick={() => onMainSelect(option)}>
                    {option}
                    {selectedOption === option && subOptions && subOptions[option] && (
                        <div className="sub-dropdown">
                            {subOptions[option].map((subOption, subIndex) => (
                                <div key={subIndex} className="sub-option" onClick={() => onSubSelect(subOption)}>
                                    {subOption}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RankingsDropdown;
