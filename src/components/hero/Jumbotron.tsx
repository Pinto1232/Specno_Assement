import React from "react";
import { JumbotronProps } from "./Jumbotron.types";
import './Jumbotron.css'

const Jumbotron: React.FC<JumbotronProps> = ({
 title,
 subtitle,
 buttonText,
 buttonLink,
}) => {
 return (
    <div className="jumbotron p-6 ">
      <h1 className="jumbotron-title font-bold mb-4">{title}</h1>
      {subtitle && <p className="jumbotron-subtitle font-bold">{subtitle}</p>}
      {buttonText && buttonLink && (
        <a href={buttonLink} className="jumbotron-button">
          {buttonText}
        </a>
      )}
    </div>
 );
};

export default Jumbotron;