import { User } from "@nextui-org/react";
import { MenuItem } from "./MenuItem.types";

export const menuData: { label: string; items: MenuItem[] }[] = [
  {
    label: "Profile & Actions",
    items: [
      {
        key: "profile",
        isReadOnly: true,
        className: "h-14 gap-2 opacity-100",
        content: (
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
        ),
      },
      { key: "dashboard", label: "Dashboard" },
      { key: "settings", label: "Settings" },
      { key: "new_project", label: "New Project" },
    ],
  },
  {
    label: "Preferences",
    items: [
      { key: "quick_search", label: "Quick search", shortcut: "⌘K" },
      {
        key: "theme",
        isReadOnly: true,
        className: "cursor-default",
        endContent: (
          <select id="theme" name="theme">
            <option>System</option>
            <option>Dark</option>
            <option>Light</option>
          </select>
        ),
        label: "Theme",
      },
    ],
  },
  {
    label: "Portfolio",
    items: [{ key: "portfolio1", label: "Portfolio Item " }],
  },
  {
    label: "Blog",
    items: [{ key: "blog1", label: "Blog Post " }],
  },
  {
    label: "Login",
    items: [{ key: "login", label: "Login" }],
  },
  {
    label: "Help & Feedback",
    items: [
      { key: "help_and_feedback", label: "Help & Feedback" },
      { key: "logout", label: "Log Out" },
    ],
  },
];
