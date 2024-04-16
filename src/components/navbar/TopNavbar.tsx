import { useState } from "react";
import { FaChevronDown, FaBars } from "react-icons/fa";
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

// Helper function to find a section by label
const findSectionByLabel = (label: string) =>
 menuData.find((section) => section.label === label);

const TopNavbar: React.FC = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const portfolioSection = findSectionByLabel("Portfolio");
 const blogSection = findSectionByLabel("Blog");
 const loginSection = findSectionByLabel("Login");

 const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
 };

 return (
    <Navbar>
      <NavbarBrand>
        <img src="../src/assets/logo.png" alt="logo" className="logo" />
      </NavbarBrand>
      <NavbarContent
        className="flex flex-col lg:flex-row lg:items-center"
      >
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="block mt-2 lg:hidden">
            <FaBars />
          </button>
          <div className={`mt-2 ${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
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
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:gap-4">
          {/* Hamburger Menu for smaller screens */}
          <NavbarItem>
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
          </NavbarItem>
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
        </div>
      </NavbarContent>
      <NavbarContent justify="end" className="flex items-center">
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
    </Navbar>
 );
};

export default TopNavbar;