/* eslint-disable react-hooks/set-state-in-effect */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";

// material-ui
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

// date picker
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// lucide-react
import {
  ChevronDown,
  Funnel,
  FunnelPlus,
  FunnelX,
  Search,
  X,
} from "lucide-react";
import { Button } from "../ui";

// ==============================|| REUSABLE DATA FILTERS ||============================== //

type FilterPrimitive = string | number | boolean;

interface DateRangeValue {
  from?: number;
  to?: number;
}

type FilterValue = FilterPrimitive | FilterPrimitive[] | DateRangeValue;

export interface FilterOption {
  value: FilterPrimitive;
  label: string;
}

export interface FilterField {
  id: string;
  label: string;
  type?: "select" | "date" | "text";
  options?: FilterOption[];
  multiple?: boolean;
  defaultVisible?: boolean;
  defaultValue?: FilterValue;
}

export interface ActiveFilter {
  fieldId: string;
  label: string;
  value: FilterValue;
  displayValue?: string;
}

export interface DataFiltersProps {
  availableFields?: FilterField[];
  activeFilters?: ActiveFilter[];
  onApplyFilter?: () => void;
  onFilterChange?: (filters: ActiveFilter[]) => void;
  onFilterSearchChange?: (fieldId: string, searchTerm: string) => void;
  refetch?: () => void;
  sx?: SxProps<Theme>;
}

const EMPTY_OPTION_VALUE = "empty";
const EMPTY_OPTION_LABEL = "---Trống---";

interface InternalFilterOption {
  value: FilterPrimitive | typeof EMPTY_OPTION_VALUE;
  label: string;
}

const formatDateValue = (value: number): string =>
  format(new Date(value), "dd/MM/yyyy", { locale: vi });

const isDateRangeValue = (
  value: FilterValue | undefined,
): value is DateRangeValue =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  ("from" in value || "to" in value);

const formatDateRangeValue = (value: DateRangeValue): string => {
  const from = value.from ? formatDateValue(value.from) : "";
  const to = value.to ? formatDateValue(value.to) : "";

  if (from && to) return `${from} - ${to}`;
  return from || to || "";
};

const getOptionLabel = (
  field: FilterField,
  value: FilterPrimitive | typeof EMPTY_OPTION_VALUE,
): string => {
  if (value === EMPTY_OPTION_VALUE) return EMPTY_OPTION_LABEL;
  return (
    field.options?.find((option) => option.value === value)?.label ??
    String(value)
  );
};

const buildDisplayValue = (field: FilterField, value: FilterValue): string => {
  if (field.type === "date") {
    if (typeof value === "number") return formatDateValue(value);
    if (isDateRangeValue(value)) return formatDateRangeValue(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => getOptionLabel(field, item)).join(", ");
  }

  if (field.type === "select") {
    return getOptionLabel(
      field,
      value as FilterPrimitive | typeof EMPTY_OPTION_VALUE,
    );
  }

  return String(value);
};

const buildDefaultFilters = (availableFields: FilterField[]): ActiveFilter[] =>
  availableFields.flatMap((field) => {
    if (!field.defaultVisible || field.defaultValue === undefined) return [];

    return [
      {
        fieldId: field.id,
        label: field.label,
        value: field.defaultValue,
        displayValue: buildDisplayValue(field, field.defaultValue),
      },
    ];
  });

const areFiltersEqual = (a: ActiveFilter[], b: ActiveFilter[]): boolean =>
  a.length === b.length &&
  a.every((filter, index) => {
    const target = b[index];
    return (
      target &&
      filter.fieldId === target.fieldId &&
      filter.label === target.label &&
      JSON.stringify(filter.value) === JSON.stringify(target.value) &&
      filter.displayValue === target.displayValue
    );
  });

const upsertFilter = (
  currentFilters: ActiveFilter[],
  nextFilter: ActiveFilter,
): ActiveFilter[] => {
  const existingIndex = currentFilters.findIndex(
    (filter) => filter.fieldId === nextFilter.fieldId,
  );

  if (existingIndex === -1) return [...currentFilters, nextFilter];

  const nextFilters = [...currentFilters];
  nextFilters[existingIndex] = nextFilter;
  return nextFilters;
};

const DataFilters = ({
  availableFields = [],
  activeFilters = [],
  onApplyFilter,
  onFilterChange,
  onFilterSearchChange,
  refetch,
  sx,
}: DataFiltersProps) => {
  const [anchorElFieldSelector, setAnchorElFieldSelector] =
    useState<HTMLElement | null>(null);
  const [anchorElFilterMenu, setAnchorElFilterMenu] =
    useState<HTMLElement | null>(null);
  const [selectedFilterForMenu, setSelectedFilterForMenu] = useState<
    string | null
  >(null);
  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  const [textInputValue, setTextInputValue] = useState("");

  const initialVisibleFields = useMemo(() => {
    if (activeFilters.length > 0) {
      return [...new Set(activeFilters.map((filter) => filter.fieldId))];
    }

    return availableFields
      .filter((field) => field.defaultVisible)
      .map((field) => field.id);
  }, [activeFilters, availableFields]);

  const initialFilters = useMemo(() => {
    if (activeFilters.length > 0) return activeFilters;
    return buildDefaultFilters(availableFields);
  }, [activeFilters, availableFields]);

  const [visibleFields, setVisibleFields] =
    useState<string[]>(initialVisibleFields);
  const [filters, setFilters] = useState<ActiveFilter[]>(initialFilters);

  const prevActiveFiltersRef = useRef<ActiveFilter[]>(activeFilters);

  const commitFilters = useCallback(
    (nextFilters: ActiveFilter[]) => {
      setFilters(nextFilters);
      prevActiveFiltersRef.current = nextFilters;
      onFilterChange?.(nextFilters);
    },
    [onFilterChange],
  );

  useEffect(() => {
    const prevActiveFilters = prevActiveFiltersRef.current;

    if (areFiltersEqual(prevActiveFilters, activeFilters)) return;

    if (activeFilters.length > 0) {
      setVisibleFields((prev) => [
        ...new Set([...prev, ...activeFilters.map((filter) => filter.fieldId)]),
      ]);
      setFilters(activeFilters);
    } else if (prevActiveFilters.length > 0) {
      setFilters([]);
    }

    prevActiveFiltersRef.current = activeFilters;
  }, [activeFilters]);

  const currentField = useMemo(
    () =>
      availableFields.find((field) => field.id === selectedFilterForMenu) ??
      null,
    [availableFields, selectedFilterForMenu],
  );

  const visibleFieldsData = useMemo(
    () => availableFields.filter((field) => visibleFields.includes(field.id)),
    [availableFields, visibleFields],
  );

  const filteredOptions = useMemo<InternalFilterOption[]>(() => {
    if (!currentField?.options) return [];

    const baseOptions: InternalFilterOption[] = [
      { label: EMPTY_OPTION_LABEL, value: EMPTY_OPTION_VALUE },
      ...currentField.options,
    ];

    if (!filterSearchTerm.trim()) return baseOptions;

    const keyword = filterSearchTerm.toLowerCase();

    return baseOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(keyword) ||
        String(option.value).toLowerCase().includes(keyword),
    );
  }, [currentField, filterSearchTerm]);

  const handleOpenFieldSelector = (event: MouseEvent<HTMLElement>) => {
    setAnchorElFieldSelector(event.currentTarget);
  };

  const handleCloseFieldSelector = () => {
    setAnchorElFieldSelector(null);
  };

  const handleOpenFilterMenu = (
    event: MouseEvent<HTMLElement>,
    fieldId: string,
  ) => {
    const field = availableFields.find((item) => item.id === fieldId);
    const existingFilter = filters.find((item) => item.fieldId === fieldId);

    setAnchorElFilterMenu(event.currentTarget);
    setSelectedFilterForMenu(fieldId);
    setFilterSearchTerm("");
    setTextInputValue(
      field?.type === "text" && typeof existingFilter?.value === "string"
        ? existingFilter.value
        : "",
    );
    onFilterSearchChange?.(fieldId, "");
  };

  const handleCloseFilterMenu = () => {
    const targetFieldId = selectedFilterForMenu;

    setAnchorElFilterMenu(null);
    setSelectedFilterForMenu(null);
    setFilterSearchTerm("");
    setTextInputValue("");

    if (targetFieldId) {
      onFilterSearchChange?.(targetFieldId, "");
    }
  };

  const handleToggleField = (fieldId: string) => {
    const isVisible = visibleFields.includes(fieldId);

    setVisibleFields((prev) =>
      isVisible ? prev.filter((id) => id !== fieldId) : [...prev, fieldId],
    );

    if (isVisible) {
      commitFilters(filters.filter((filter) => filter.fieldId !== fieldId));
    }
  };

  const handleFilterSearchChange = (value: string) => {
    setFilterSearchTerm(value);

    if (selectedFilterForMenu) {
      onFilterSearchChange?.(selectedFilterForMenu, value);
    }
  };

  const handleSelectOption = (
    fieldId: string,
    option: InternalFilterOption,
  ) => {
    const field = availableFields.find((item) => item.id === fieldId);
    if (!field) return;

    const currentFilter = filters.find((item) => item.fieldId === fieldId);

    if (field.multiple) {
      const currentValues = Array.isArray(currentFilter?.value)
        ? currentFilter.value
        : currentFilter?.value !== undefined
          ? [currentFilter.value]
          : [];

      const exists = currentValues.includes(option.value);
      const nextValue = exists
        ? currentValues.filter((value) => value !== option.value)
        : [...currentValues, option.value];

      if (nextValue.length === 0) {
        commitFilters(filters.filter((filter) => filter.fieldId !== fieldId));
        return;
      }

      const nextFilter: ActiveFilter = {
        fieldId,
        label: field.label,
        value: nextValue as FilterPrimitive[],
        displayValue: nextValue
          .map((value) => getOptionLabel(field, value as FilterPrimitive))
          .join(", "),
      };

      commitFilters(upsertFilter(filters, nextFilter));
      return;
    }

    const nextFilter: ActiveFilter = {
      fieldId,
      label: field.label,
      value: option.value,
      displayValue: option.label,
    };

    commitFilters(upsertFilter(filters, nextFilter));
    handleCloseFilterMenu();
  };

  const handleDateChange = (fieldId: string, date: Date | null) => {
    const field = availableFields.find((item) => item.id === fieldId);
    if (!field) return;

    if (!date) {
      commitFilters(filters.filter((filter) => filter.fieldId !== fieldId));
      return;
    }

    const nextFilter: ActiveFilter = {
      fieldId,
      label: field.label,
      value: date.getTime(),
      displayValue: formatDateValue(date.getTime()),
    };

    commitFilters(upsertFilter(filters, nextFilter));
  };

  const handleDateRangeChange = (
    field: FilterField,
    key: keyof DateRangeValue,
    date: Date | null,
  ) => {
    const currentFilter = filters.find((item) => item.fieldId === field.id);
    const currentValue = isDateRangeValue(currentFilter?.value)
      ? currentFilter.value
      : {};

    const nextValue: DateRangeValue = {
      ...currentValue,
      [key]: date ? date.getTime() : undefined,
    };

    if (!nextValue.from && !nextValue.to) {
      commitFilters(filters.filter((filter) => filter.fieldId !== field.id));
      return;
    }

    const nextFilter: ActiveFilter = {
      fieldId: field.id,
      label: field.label,
      value: nextValue,
      displayValue: formatDateRangeValue(nextValue),
    };

    commitFilters(upsertFilter(filters, nextFilter));
  };

  const handleTextFilterChange = (fieldId: string, value: string) => {
    const field = availableFields.find((item) => item.id === fieldId);
    if (!field) return;

    setTextInputValue(value);

    const normalizedValue = value.trim();

    if (!normalizedValue) {
      commitFilters(filters.filter((filter) => filter.fieldId !== fieldId));
      return;
    }

    const nextFilter: ActiveFilter = {
      fieldId,
      label: field.label,
      value: normalizedValue,
      displayValue: normalizedValue,
    };

    commitFilters(upsertFilter(filters, nextFilter));
  };

  const handleRemoveFilter = (fieldId: string) => {
    commitFilters(filters.filter((filter) => filter.fieldId !== fieldId));
  };

  const handleRemoveAllFilter = () => {
    commitFilters([]);
  };

  const handleApply = () => {
    onApplyFilter?.();
    refetch?.();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: 1.5,
        mb: 2.5,
        p: 1,
        borderRadius: 2,
        bgcolor: "transparent",
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{
          flex: 1,
          minWidth: 0,
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        <Button
          variant="outlined"
          onClick={handleApply}
          startIcon={<Funnel size={16} />}
          sx={{
            flexShrink: 0,
            borderRadius: 2,
            textTransform: "none",
            alignSelf: { xs: "flex-start", md: "center" },
          }}
        >
          Lọc
        </Button>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{
            flex: 1,
            minWidth: 0,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {visibleFieldsData.map((field) => {
            const activeFilter = filters.find(
              (filter) => filter.fieldId === field.id,
            );
            const hasValue = Boolean(activeFilter);

            const selectedValues =
              field.multiple && Array.isArray(activeFilter?.value)
                ? activeFilter.value
                : [];

            const selectedLabels = selectedValues.map((value) =>
              getOptionLabel(field, value),
            );

            const firstLabel = selectedLabels[0] ?? "";
            const remainingCount = Math.max(selectedLabels.length - 1, 0);

            const displayText =
              field.multiple && selectedLabels.length > 1
                ? `${firstLabel} +${remainingCount}`
                : (activeFilter?.displayValue ?? "");

            const content = (
              <Paper
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                }}
              >
                <Button
                  variant="text"
                  color="inherit"
                  onClick={(event) => handleOpenFilterMenu(event, field.id)}
                  endIcon={<ChevronDown size={16} />}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    minHeight: 36,
                    borderRadius: 0,
                    textTransform: "none",
                    // color: "text.primary",
                    justifyContent: "flex-start",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ fontSize: "0.8125rem" }}
                  >
                    {field.label}
                    {hasValue ? `: ${displayText}` : ""}
                  </Typography>
                </Button>

                {hasValue && (
                  <IconButton
                    size="small"
                    aria-label={`remove-${field.id}-filter`}
                    onClick={() => handleRemoveFilter(field.id)}
                    sx={{
                      mr: 0.5,
                      color: "text.secondary",
                      "&:hover": {
                        color: "error.main",
                        bgcolor: "error.lighter",
                      },
                    }}
                  >
                    <X size={14} />
                  </IconButton>
                )}
              </Paper>
            );

            if (field.multiple && selectedLabels.length > 1) {
              return (
                <Tooltip
                  key={field.id}
                  title={
                    <Box sx={{ py: 0.5 }}>
                      {selectedLabels.map((label) => (
                        <Typography
                          key={label}
                          variant="body2"
                          sx={{ color: "common.white" }}
                        >
                          {label}
                        </Typography>
                      ))}
                    </Box>
                  }
                  arrow
                  placement="top"
                  slotProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "rgba(0, 0, 0, 0.87)",
                        maxWidth: 320,
                      },
                    },
                    arrow: {
                      sx: {
                        color: "rgba(0, 0, 0, 0.87)",
                      },
                    },
                  }}
                >
                  {content}
                </Tooltip>
              );
            }

            return <Box key={field.id}>{content}</Box>;
          })}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          onClick={handleRemoveAllFilter}
          size="small"
          disabled={filters.length === 0}
          aria-label="remove-all-filters"
        >
          <FunnelX size={18} />
        </IconButton>

        <Button
          variant="outlined"
          onClick={handleOpenFieldSelector}
          startIcon={<FunnelPlus size={16} />}
          sx={{
            borderStyle: "dashed",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Thêm lọc
        </Button>
      </Stack>

      <Popover
        open={Boolean(anchorElFieldSelector)}
        anchorEl={anchorElFieldSelector}
        onClose={handleCloseFieldSelector}
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
          Chọn trường lọc
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={0.5}>
          {availableFields.map((field) => (
            <FormControlLabel
              key={field.id}
              control={
                <Checkbox
                  checked={visibleFields.includes(field.id)}
                  onChange={() => handleToggleField(field.id)}
                  size="small"
                />
              }
              label={<Typography variant="body2">{field.label}</Typography>}
            />
          ))}
        </Stack>
      </Popover>

      <Menu
        anchorEl={anchorElFilterMenu}
        open={Boolean(anchorElFilterMenu)}
        onClose={handleCloseFilterMenu}
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
            sx: {
              minWidth: 280,
              maxHeight: 420,
            },
          },
        }}
      >
        {currentField?.type === "date" ? (
          <Box sx={{ p: 1.5 }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={vi}
            >
              {currentField.id === "dateRange" ? (
                <Stack spacing={2}>
                  <DatePicker
                    label="Từ ngày"
                    value={
                      isDateRangeValue(
                        filters.find(
                          (filter) => filter.fieldId === currentField.id,
                        )?.value,
                      ) &&
                      (
                        filters.find(
                          (filter) => filter.fieldId === currentField.id,
                        )?.value as DateRangeValue
                      ).from
                        ? new Date(
                            (
                              filters.find(
                                (filter) => filter.fieldId === currentField.id,
                              )?.value as DateRangeValue
                            ).from!,
                          )
                        : null
                    }
                    onChange={(date) =>
                      handleDateRangeChange(currentField, "from", date)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />

                  <DatePicker
                    label="Đến ngày"
                    value={
                      isDateRangeValue(
                        filters.find(
                          (filter) => filter.fieldId === currentField.id,
                        )?.value,
                      ) &&
                      (
                        filters.find(
                          (filter) => filter.fieldId === currentField.id,
                        )?.value as DateRangeValue
                      ).to
                        ? new Date(
                            (
                              filters.find(
                                (filter) => filter.fieldId === currentField.id,
                              )?.value as DateRangeValue
                            ).to!,
                          )
                        : null
                    }
                    onChange={(date) =>
                      handleDateRangeChange(currentField, "to", date)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </Stack>
              ) : (
                <DatePicker
                  label="Chọn ngày"
                  value={
                    typeof filters.find(
                      (filter) => filter.fieldId === currentField.id,
                    )?.value === "number"
                      ? new Date(
                          filters.find(
                            (filter) => filter.fieldId === currentField.id,
                          )!.value as number,
                        )
                      : null
                  }
                  onChange={(date) => handleDateChange(currentField.id, date)}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />
              )}
            </LocalizationProvider>
          </Box>
        ) : currentField?.type === "text" ? (
          <Box sx={{ p: 1.5 }}>
            <OutlinedInput
              fullWidth
              size="small"
              placeholder="Nhập giá trị..."
              value={textInputValue}
              onChange={(event) =>
                handleTextFilterChange(currentField.id, event.target.value)
              }
              startAdornment={
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              }
              endAdornment={
                textInputValue ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleTextFilterChange(currentField.id, "")
                      }
                    >
                      <X size={14} />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              autoFocus
            />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                p: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <OutlinedInput
                fullWidth
                size="small"
                placeholder="Tìm kiếm..."
                value={filterSearchTerm}
                onChange={(event) =>
                  handleFilterSearchChange(event.target.value)
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                }
                endAdornment={
                  filterSearchTerm ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => handleFilterSearchChange("")}
                        sx={{ p: 0.5 }}
                      >
                        <X size={14} />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined
                }
                autoFocus
              />
            </Box>

            <Box sx={{ maxHeight: 300, overflow: "auto" }}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const currentFilter = filters.find(
                    (filter) => filter.fieldId === currentField?.id,
                  );
                  const currentValue = currentFilter?.value;

                  const isSelected = currentField?.multiple
                    ? Array.isArray(currentValue) &&
                      currentValue.includes(option.value)
                    : currentValue === option.value;

                  return (
                    <MenuItem
                      key={String(option.value)}
                      onClick={() =>
                        handleSelectOption(currentField!.id, option)
                      }
                      dense
                    >
                      {currentField?.multiple && (
                        <Checkbox
                          checked={isSelected}
                          size="small"
                          sx={{ mr: 1, p: 0.5 }}
                        />
                      )}
                      <Typography variant="body2">{option.label}</Typography>
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    {filterSearchTerm
                      ? "Không tìm thấy kết quả"
                      : "Không có tùy chọn"}
                  </Typography>
                </MenuItem>
              )}
            </Box>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default DataFilters;
