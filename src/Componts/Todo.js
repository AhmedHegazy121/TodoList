// ==========================================
// 1. EXTERNAL IMPORTS (Material UI Core & Icons)
// ==========================================
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckIcon from "@mui/icons-material/Check";

// ==========================================
// 2. INTERNAL IMPORTS (Context Framework Hooks)
// ==========================================
import { useTodes } from "../context/TodosContext";
import { useToast } from "../context/ToastContext";

// ==========================================
// 3. MAIN COMPONENT IMPLEMENTATION
// ==========================================
export default function Todo({ todo, showDelete, showEdite }) {
  // --- Context State Extraction ---
  const { todos, dispatch } = useTodes();
  const { showHideToast } = useToast();

  // --- Responsive Setup Variables ---
  const theme = useTheme();

  // Checks for mobile screens (width under 600px)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // NEW: Detects tablet/medium viewports exactly between 600px and 850px width
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:850px)");

  // ==========================================
  // 4. COMPONENT EVENT HANDLERS
  // ==========================================

  // Toggles the checked status of the target todo task
  function handleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: { id: todo.id } });
    showHideToast(" إكتمل بنجاح ");
  }

  // Opens the validation model to delete the current task
  function handleDeleteClick() {
    showDelete(todo);
  }

  // Opens the update input portal modal for this specific task
  function handleEditeClick() {
    showEdite(todo);
  }

  // ==========================================
  // 5. RENDER USER INTERFACE
  // ==========================================
  return (
    <>
      <Card
        className="todoCard"
        sx={{ minWidth: 275, background: "white", marginTop: 2 }}
      >
        <CardContent
          sx={{
            padding: isMobile ? "12px" : "16px",
            "&:last-child": { pb: isMobile ? "12px" : "16px" },
          }}
        >
          <Grid
            container
            spacing={isMobile ? 1 : 2}
            sx={{ direction: "rtl", alignItems: "center" }}
          >
            {/* --- Text Content Columns (Title & Details) --- */}
            {/* Dynamically resizes column layout allocations so text gets more breathing room on tablet viewports */}
            <Grid size={isMobile ? 7 : isTablet ? 8 : 9}>
              <Typography
                className="c-gray"
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  // Dynamically scales the font sizing structure down step-by-step
                  fontSize: isMobile ? "15px" : isTablet ? "18px" : "1.5rem",
                  fontWeight: "bold",
                  wordBreak: "break-all",
                }}
              >
                {todo.title}
              </Typography>
              {todo.description && (
                <Typography
                  className="c-gray"
                  variant="h6"
                  sx={{
                    textAlign: "right",
                    fontSize: isMobile ? "12px" : isTablet ? "14px" : "1.25rem",
                    opacity: 0.8,
                    wordBreak: "break-all",
                  }}
                >
                  {todo.description}
                </Typography>
              )}
            </Grid>

            {/* --- Action Interactive Icon Group --- */}
            {/* Dynamically shifts space width layouts for buttons to comfortably balance on tablets */}
            <Grid
              size={isMobile ? 5 : isTablet ? 4 : 3}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* Checklist Toggle Action Button */}
              <IconButton
                onClick={handleCheckClick}
                aria-label="check-icon"
                className="checked"
                style={{
                  color: todo.isCompleted ? "white" : "#004d40",
                  background: todo.isCompleted ? "#004d40" : "#e0f2f1",
                  border: "solid #00695c 3px",
                  // Handles intermediate sizes for icons and spacing rings smoothly
                  padding: isMobile ? "4px" : isTablet ? "6px" : "8px",
                  width: isMobile ? "32px" : isTablet ? "38px" : "44px",
                  height: isMobile ? "32px" : isTablet ? "38px" : "44px",
                }}
              >
                <CheckIcon
                  sx={{
                    fontSize: isMobile ? "16px" : isTablet ? "20px" : "24px",
                  }}
                />
              </IconButton>

              {/* Edit Button */}
              <IconButton
                className="edite"
                aria-label="edite"
                style={{
                  color: "#0288d1",
                  background: "#e1f5fe",
                  border: "solid #29b6f6 3px",
                  padding: isMobile ? "4px" : isTablet ? "6px" : "8px",
                  width: isMobile ? "32px" : isTablet ? "38px" : "44px",
                  height: isMobile ? "32px" : isTablet ? "38px" : "44px",
                }}
                onClick={handleEditeClick}
              >
                <AutoFixHighIcon
                  sx={{
                    fontSize: isMobile ? "16px" : isTablet ? "20px" : "24px",
                  }}
                />
              </IconButton>

              {/* Delete Button */}
              <IconButton
                className="delete"
                aria-label="delete"
                style={{
                  color: "#d32f2f",
                  background: "#ffebee",
                  border: "solid #ef5350 3px",
                  padding: isMobile ? "4px" : isTablet ? "6px" : "8px",
                  width: isMobile ? "32px" : isTablet ? "38px" : "44px",
                  height: isMobile ? "32px" : isTablet ? "38px" : "44px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon
                  sx={{
                    fontSize: isMobile ? "16px" : isTablet ? "20px" : "24px",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
