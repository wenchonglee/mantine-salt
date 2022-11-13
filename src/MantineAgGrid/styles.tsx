import { Global } from "@mantine/core";

export const MantineAgGridStyles = () => (
  <Global
    styles={(theme) => ({
      ".ag-theme-mantine .ag-header-cell-text": {
        fontWeight: "500",
      },
      ".ag-theme-mantine .ag-icon-filter": {
        background: `transparent url("https://tabler-icons.io/static/tabler-icons/icons/filter.svg") center/contain no-repeat`,
        "background-size": "14px",
        color: "transparent",
      },
      ".ag-theme-mantine .ag-icon-columns": {
        background: `transparent url("https://tabler-icons.io/static/tabler-icons/icons/layout-columns.svg") center/contain no-repeat`,
        "background-size": "14px",
        color: "transparent",
      },
      ".ag-theme-mantine": {
        "--ag-font-family": theme.fontFamily,
        "--ag-font-size": `${theme.fontSizes.sm}px`,
        "--ag-grid-size": "6px",
        "--ag-row-height": "calc(var(--ag-grid-size) * 6)",
        "--ag-header-height": "calc(var(--ag-grid-size) * 8)",
        "--ag-cell-horizontal-padding": " 7px",
        "--ag-border-color": "var(--mantine-color-gray-3)",
        "--ag-row-hover-color": "var(--mantine-color-gray-1)",
        "--ag-selected-row-background-color": "var(--mantine-color-gray-1)",
        "--ag-icon-size": "24px",
        // "--ag-background-color": theme.colors.dark[7],

        /* 
  --ag-list-item-height
  --ag-foreground-color
  --ag-icon-font-family
  --ag-secondary-foreground-color
  --ag-data-color
  --ag-header-foreground-color
  --ag-header-background-color
  --ag-disabled-foreground-color
  --ag-subheader-background-color
  --ag-subheader-toolbar-background-color
  --ag-control-panel-background-color
  --ag-side-button-selected-background-color
  --ag-selected-row-background-color
  --ag-odd-row-background-color
  --ag-modal-overlay-background-color
  --ag-column-hover-color
  --ag-range-selection-border-color
  --ag-range-selection-border-style
  --ag-range-selection-background-color
  --ag-range-selection-background-color-2
  --ag-range-selection-background-color-3
  --ag-range-selection-background-color-4
  --ag-range-selection-highlight-color
  --ag-selected-tab-underline-color
  --ag-selected-tab-underline-width
  --ag-selected-tab-underline-transition-speed
  --ag-range-selection-chart-category-background-color
  --ag-range-selection-chart-background-color
  --ag-header-cell-hover-background-color
  --ag-header-cell-moving-background-color
  --ag-value-change-value-highlight-background-color
  --ag-value-change-delta-up-color
  --ag-value-change-delta-down-color
  --ag-chip-background-color
  --ag-borders
  --ag-border-color
  --ag-borders-critical
  --ag-borders-secondary
  --ag-secondary-border-color
  --ag-borders-row
  --ag-cell-horizontal-border
  --ag-borders-input
  --ag-input-border-color
  --ag-borders-input-invalid
  --ag-input-border-color-invalid
  --ag-borders-side-button
  --ag-border-radius
  --ag-row-border-color
  --ag-invalid-color
  --ag-input-disabled-border-color
  --ag-input-disabled-background-color
  --ag-checkbox-background-color
  --ag-checkbox-border-radius
  --ag-checkbox-checked-color
  --ag-checkbox-unchecked-color
  --ag-checkbox-indeterminate-color
  --ag-toggle-button-border-width
  --ag-toggle-button-on-border-color
  --ag-toggle-button-off-border-color
  --ag-toggle-button-on-background-color
  --ag-toggle-button-off-background-color
  --ag-toggle-button-switch-background-color
  --ag-toggle-button-switch-border-color
  --ag-toggle-button-width
  --ag-toggle-button-height
  --ag-input-focus-box-shadow
  --ag-input-focus-border-color
  --ag-minichart-selected-chart-color
  --ag-minichart-selected-page-color
  --ag-icon-size
  --ag-widget-container-horizontal-padding
  --ag-widget-container-vertical-padding
  --ag-widget-horizontal-spacing
  --ag-widget-vertical-spacing
  --ag-cell-widget-spacing
  --ag-header-column-separator-display
  --ag-header-column-separator-height
  --ag-header-column-separator-width
  --ag-header-column-separator-color
  --ag-header-column-resize-handle-display
  --ag-header-column-resize-handle-height
  --ag-header-column-resize-handle-width
  --ag-header-column-resize-handle-color
  --ag-column-select-indent-size
  --ag-row-group-indent-size
  --ag-filter-tool-panel-group-indent
  --ag-tab-min-width
  --ag-menu-min-width
  --ag-side-bar-panel-width
  --ag-card-radius
  --ag-card-shadow
  --ag-popup-shadow
   */
      },
    })}
  />
);
