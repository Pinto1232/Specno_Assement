export interface MenuItem {
  key: string;
  label?: string;
  isReadOnly?: boolean;
  className?: string;
  content?: React.ReactElement;
  endContent?: React.ReactElement;
  shortcut?: string;
}

export interface Section {
  label: string;
  items: MenuItem[];
}
