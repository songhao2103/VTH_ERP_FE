import { useState, type MouseEvent } from "react";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

// icons
import { ChevronDown, Columns3, Search } from "lucide-react";

// types
import type { DataTableColumn } from "./DataTable";

// ==============================|| DATA TABLE SEARCH ||============================== //

type BaseRow = Record<string, unknown>;

export interface DataTableSearchProps<T extends BaseRow = BaseRow> {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchColumn: string;
  onSearchColumnChange: (columnId: string) => void;
  searchableColumns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  columns: DataTableColumn<T>[];
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
  sx?: SxProps<Theme>;
}

function DataTableSearch<T extends BaseRow = BaseRow>({
  searchTerm,
  onSearchChange,
  searchColumn,
  onSearchColumnChange,
  searchableColumns,
  searchPlaceholder = "Tìm kiếm",
  columns,
  visibleColumns,
  onVisibleColumnsChange,
  sx,
}: DataTableSearchProps<T>) {
  const [anchorElColumns, setAnchorElColumns] = useState<HTMLElement | null>(
    null,
  );
  const [anchorElSearchMenu, setAnchorElSearchMenu] =
    useState<HTMLElement | null>(null);

  const selectedSearchColumnLabel =
    searchableColumns.find((column) => column.id === searchColumn)?.label ??
    "Chọn cột";

  const handleOpenColumnsPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorElColumns(event.currentTarget);
  };

  const handleCloseColumnsPopover = () => {
    setAnchorElColumns(null);
  };

  const handleOpenSearchMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElSearchMenu(event.currentTarget);
  };

  const handleCloseSearchMenu = () => {
    setAnchorElSearchMenu(null);
  };

  const handleSelectSearchColumn = (columnId: string) => {
    onSearchColumnChange(columnId);
    handleCloseSearchMenu();
  };

  const handleToggleColumn = (columnId: string) => {
    const isVisible = visibleColumns.includes(columnId);

    if (isVisible) {
      onVisibleColumnsChange(visibleColumns.filter((id) => id !== columnId));
      return;
    }

    onVisibleColumnsChange([...visibleColumns, columnId]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          pb: 2,
          ...sx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "stretch", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            flexWrap: "wrap",
            flex: 1,
            minWidth: 0,
          }}
        >
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: { xs: "100%", sm: 350 },
              minWidth: { xs: "100%", sm: 220 },
              "& .MuiOutlinedInput-root": {
                bgcolor: "grey.100",
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: 14,
                color: "text.primary",
              },
            }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
            }}
          >
            Theo thuộc tính
          </Typography>

          <Button
            variant="text"
            color="inherit"
            size="small"
            endIcon={<ChevronDown size={16} />}
            onClick={handleOpenSearchMenu}
            sx={{
              textTransform: "none",
              minWidth: 80,
              justifyContent: "space-between",
              px: 1,
              color: "text.primary",
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
          >
            <Typography variant="body2" component="span">
              {selectedSearchColumnLabel}
            </Typography>
          </Button>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Columns3 size={16} />}
          onClick={handleOpenColumnsPopover}
          sx={{
            textTransform: "none",
            whiteSpace: "nowrap",
            borderRadius: 2,
            width: { xs: "100%", md: "auto" },
            justifyContent: { xs: "flex-start", md: "center" },
          }}
        >
          Thêm cột hiển thị
        </Button>
      </Box>

      <Menu
        anchorEl={anchorElSearchMenu}
        open={Boolean(anchorElSearchMenu)}
        onClose={handleCloseSearchMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: { minWidth: 180 },
          },
        }}
      >
        {searchableColumns.map((column) => (
          <MenuItem
            key={column.id}
            onClick={() => handleSelectSearchColumn(column.id)}
            selected={searchColumn === column.id}
          >
            <Typography variant="body2">{column.label}</Typography>
          </MenuItem>
        ))}
      </Menu>

      <Popover
        open={Boolean(anchorElColumns)}
        anchorEl={anchorElColumns}
        onClose={handleCloseColumnsPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              minWidth: 220,
            },
          },
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Chọn cột hiển thị
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={0.5}>
          {columns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={visibleColumns.includes(column.id)}
                  onChange={() => handleToggleColumn(column.id)}
                  size="small"
                />
              }
              label={<Typography variant="body2">{column.label}</Typography>}
            />
          ))}
        </Stack>
      </Popover>
    </>
  );
}

export default DataTableSearch;
