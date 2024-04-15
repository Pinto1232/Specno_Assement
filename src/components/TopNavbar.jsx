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
  User,
} from "@nextui-org/react";

const TopNavbar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Specno</p>
      </NavbarBrand>
      <NavbarContent className=" sm:flex gap-4" justify="center">
        <Dropdown
          showArrow
          radius="sm"
          classNames={{
            base: "before:bg-default-200",
            content: "p-0",
          }}
        >
          <DropdownTrigger>
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              Our Services
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={["profile"]}
            className="p-3"
          >
            <DropdownSection aria-label="Profile & Actions" showDivider>
              <DropdownItem
                isReadOnly
                key="profile"
                className="h-14 gap-2 opacity-100"
              >
                <User
                  name="Junior Garcia"
                  description="@jrgarciadev"
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                />
              </DropdownItem>
              <DropdownItem key="dashboard">Dashboard</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="new_project">New Project</DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Preferences" showDivider>
              <DropdownItem key="quick_search" shortcut="⌘K">
                Quick search
              </DropdownItem>
              <DropdownItem
                isReadOnly
                key="theme"
                className="cursor-default"
                endContent={
                  <select
                    id="theme"
                    name="theme"
                  >
                    <option>System</option>
                    <option>Dark</option>
                    <option>Light</option>
                  </select>
                }
              >
                Theme
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout">Log Out</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link color="foreground" href="#">
            Portfolio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Careers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="#"
            variant="solid"
            style={{
              borderRadius: 0,
              backgroundColor: "#489dda",
              color: "#fff",
            }}
          >
            Discuss A Project
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavbar;
