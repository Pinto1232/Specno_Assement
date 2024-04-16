import React from "react";
import styles from "./OfficeDetails.module.css";
import icons from "../../assets/Mask.png";
import iconsTwo from "../../assets/Mask Group 2.png";
import iconsThree from "../../assets/Mask Group 3.png";
import iconsFour from "../../assets/Mask Group 4.png";
import iconsFive from "../../assets/Mask Group 6.png";
import iconsSix from "../../assets/Mask Group 7.png";
import { MdMoreVert } from "react-icons/md";

interface User {
  name: string;
  surname: string;
  imageIcon: string;
}

const OfficeDetails: React.FC = () => {
  const users: User[] = [
    {
      name: "Alexander",
      surname: "Hamilton",
      imageIcon: icons,
    },
    {
      name: "Elizabeth",
      surname: "Schuyler",
      imageIcon: iconsTwo,
    },
    {
      name: "Theodore",
      surname: "Roosevelt",
      imageIcon: iconsThree,
    },
    {
      name: "Katherine",
      surname: "Johnson",
      imageIcon: iconsFour,
    },
    {
      name: "Benjamin",
      surname: "Franklin",
      imageIcon: iconsFive,
    },
    {
      name: "Margaret",
      surname: "Hamilton",
      imageIcon: iconsSix,
    },
  ];

  return (
    <div className={styles["office-details-container"]}>
      <h3 className={styles["office-details-title"]}>
        Staff members in office
      </h3>
      <div className={styles["office-details-grid"]}>
        {users.map((user, index) => (
          <div key={index} className={styles["office-details-card"]}>
            <img
              src={user.imageIcon}
              alt={`${user.name} ${user.surname}`}
              className={styles["office-details-image"]}
            />
            <p className={styles["office-details-name"]}>
              {user.name} {user.surname}
            </p>
            <p className={styles["office-details-name"]}>
              <MdMoreVert style={{ cursor: "pointer" }} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeDetails;
