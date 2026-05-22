// ==========================================
// 1. EXTERNAL IMPORTS (Material UI Core & Icons)
// ==========================================
import { Card, CardContent, Typography, Grid } from "@mui/material";
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
        sx={{ minWidth: 275, background: "white", marginTop: 5 }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* --- Text Content Columns (Title & Details) --- */}
            <Grid size={9}>
              <Typography
                className="c-gray"
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompeleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                className="c-gray"
                variant="h6"
                sx={{ textAlign: "right" }}
              >
                {todo.description}
              </Typography>
            </Grid>

            {/* --- Action Interactive Icon Group --- */}
            <Grid
              size={3}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* Checklist Toggle Action Button */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                aria-label="check-icon"
                className="checked"
                style={{
                  color: todo.isCompleted ? "white" : "#004d40", // Uses Theme Dark Teal
                  background: todo.isCompleted ? "#004d40" : "#e0f2f1", // Balanced Light Teal Backing
                  border: "solid #00695c 3px", // Core Theme Primary Teal Border
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* Edite Button */}
              <IconButton
                className="edite"
                aria-label="edite"
                style={{
                  color: "#0288d1", // Clean, Professional Corporate Info Blue
                  background: "#e1f5fe", // Soft Light Blue Background Accent
                  border: "solid #29b6f6 3px", // Defined Mid-tone Info Border Accent
                }}
                onClick={handleEditeClick}
              >
                <AutoFixHighIcon />
              </IconButton>
              {/* Edite Button */}

              {/* Delete Button */}
              <IconButton
                className="delete"
                aria-label="delete"
                style={{
                  color: "#d32f2f", // High-Contrast Danger/Error Red Accent
                  background: "#ffebee", // Soft Light Warning Pink Background Accent
                  border: "solid #ef5350 3px", // Crisp Coral Warning Border Accent
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* Delete Button */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
