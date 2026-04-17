import type { ChangeEvent } from "react";

// material-ui
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// icons
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// ==============================|| DATA TABLE PAGINATION ||============================== //

export interface DataTablePaginationProps {
  page: number;
  pageCount: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  total: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

interface SelectIconProps {
  className?: string;
}

const SelectChevronIcon = ({ className }: SelectIconProps) => (
  <ChevronDown className={className} size={16} />
);

const paginationButtonSx = {
  width: 32,
  height: 32,
  bgcolor: "grey.150",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
  "&:hover": {
    bgcolor: "grey.100",
  },
  "&.Mui-disabled": {
    opacity: 0.5,
  },
} as const;

const DataTablePagination = ({
  page,
  pageCount,
  rowsPerPage,
  rowsPerPageOptions,
  total,
  startIndex,
  endIndex,
  onPageChange,
  onRowsPerPageChange,
  onPrevPage,
  onNextPage,
}: DataTablePaginationProps) => {
  return (
    <Box
      sx={{
        mx: 2,
        mt: 1.5,
        pt: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
        <IconButton
          size="small"
          disabled={page <= 1}
          onClick={onPrevPage}
          sx={paginationButtonSx}
          aria-label="Trang trước"
        >
          <ChevronLeft size={16} />
        </IconButton>

        <Pagination
          count={pageCount}
          page={page}
          onChange={onPageChange}
          color="primary"
          size="small"
          siblingCount={1}
          boundaryCount={1}
          hidePrevButton
          hideNextButton
          sx={{
            "& .MuiPaginationItem-root": {
              minWidth: 32,
              height: 32,
              bgcolor: "grey.150",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              mx: 0.25,
              "&.Mui-selected": {
                bgcolor: "purple.main",
                color: "common.white",
                "&:hover": {
                  bgcolor: "grey.900",
                },
              },
            },
          }}
        />

        <IconButton
          size="small"
          disabled={page >= pageCount}
          onClick={onNextPage}
          sx={paginationButtonSx}
          aria-label="Trang sau"
        >
          <ChevronRight size={16} />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: 32,
            bgcolor: "grey.150",
            borderRadius: 1.5,
            px: 2,
            py: 0.75,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            {startIndex} - {endIndex} của {total.toLocaleString("vi-VN")}
          </Typography>
        </Box>

        <TextField
          select
          size="small"
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          sx={{
            minWidth: 100,
            "& .MuiOutlinedInput-root": {
              height: 32,
              bgcolor: "grey.150",
              borderRadius: 1.5,
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            "& .MuiSelect-select": {
              py: 0.75,
              px: 2,
              fontSize: "0.875rem",
              color: "text.secondary",
              fontWeight: 500,
              bgcolor: "transparent",
              height: "100%",
              display: "flex",
              alignItems: "center",
            },
          }}
          slotProps={{
            select: {
              IconComponent: SelectChevronIcon,
            },
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option} dòng
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  );
};

export default DataTablePagination;
