import React from "react";

interface BotonTopeGuayProps {
  texto: string;
}

const BotonTopeGuay: React.FC<BotonTopeGuayProps> = ({ texto }) => {
  return (
    <button
      style={{
        backgroundColor: "orange",
      }}
    >
      {texto}
    </button>
  );
};

export default BotonTopeGuayProps;
