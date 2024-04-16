import { FaChevronDown } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { menuData } from "../navbar/menuData";
import "./Navbar.css";
import { useEffect, useState } from "react";

const findSectionByLabel = (label: string) =>
  menuData.find((section) => section.label === label);


const TopNavbar: React.FC = () => {
  const portfolioSection = findSectionByLabel("Portfolio");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const blogSection = findSectionByLabel("Blog");
  const loginSection = findSectionByLabel("Login");


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <img src="../src/assets/logo.png" alt="logo" className="logo" />
      </NavbarBrand>
      <NavbarContent
        className="sm:flex"
        justify="center"
        style={{ gap: "20px" }}
      >
        <Dropdown
          showArrow
          radius="sm"
          classNames={{
            base: "before:bg-default-200",
            content: "p-0",
          }}
        >
          <DropdownTrigger>
            <Link className="dropdown-link">
              Our Services <FaChevronDown className="chevron-icon" />
            </Link>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={["profile"]}
            className="p-3"
          >
            {menuData.map((section, index) => (
              <DropdownSection
                key={index}
                aria-label={section.label}
                showDivider
              >
                {section.items.map((item) => (
                  <DropdownItem
                    key={item.key}
                    isReadOnly={item.isReadOnly}
                    className={item.className}
                    shortcut={"shortcut" in item ? item.shortcut : undefined}
                    endContent={item.endContent}
                  >
                    {item.content || item.label}
                  </DropdownItem>
                ))}
              </DropdownSection>
            ))}
          </DropdownMenu>
        </Dropdown>
        {/* Dynamic Navigation Items */}
        {portfolioSection &&
          portfolioSection.items.map((item) => (
            <NavbarItem key={item.key}>
              <Link color="foreground" href="#">
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        {blogSection &&
          blogSection.items.map((item) => (
            <NavbarItem key={item.key}>
              <Link color="foreground" href="#">
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        {loginSection &&
          loginSection.items.map((item) => (
            <NavbarItem key={item.key}>
              <Link color="foreground" href="#">
                {item.label}
              </Link>
            </NavbarItem>
          ))}
      </NavbarContent>
      {windowWidth >= 1024 && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="#"
              variant="solid"
              className="discuss-project-button"
            >
              Discuss A Project
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default TopNavbar;
