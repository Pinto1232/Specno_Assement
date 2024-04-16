import { Link } from "react-router-dom";

interface Office {
  id: string;
  name: string;
  description: string;
}

const OfficeList = ({ offices }: { offices: Office[] }) => (
  <div>
    {offices.map((office) => (
      <Link to={`/office/${office.id}`} state={{ office }}>
        <div className="office-item">
          <h2>{office.name}</h2>
          <p>{office.description}</p>
          {/* Other details */}
        </div>
      </Link>
    ))}
  </div>
);

export default OfficeList;
