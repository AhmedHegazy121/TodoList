// ==========================================
// 1. EXTERNAL IMPORTS (React Core & Hooks)
// ==========================================
import { useState, useEffect, useMemo } from "react";

// ==========================================
// 2. EXTERNAL IMPORTS (Material UI Components)
// ==========================================
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

// ==========================================
// 3. INTERNAL IMPORTS (Context & Components)
// ==========================================
import { useTodes } from "../context/TodosContext";
import { useToast } from "../context/ToastContext";
import Todo from "./Todo";

// ==========================================
// 4. MAIN COMPONENT IMPLEMENTATION
// ==========================================
export default function TodoList() {
  // --- Responsive Setup Variables ---
  const theme = useTheme();

  // Checks for small mobile screens (width under 600px)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Detects tablet viewports exactly between 600px and 850px width
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:850px)");
  // --- Context Hooks ---
  const { todos, dispatch } = useTodes();
  const { showHideToast } = useToast();

  // --- Component States ---
  const [inputTitle, setInputTitle] = useState("");
  const [displayTodosType, setDisplayedTodosType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditeDialog, setShowEditeDialog] = useState(false);

  // --- Initial Fetch Effect ---
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  // ==========================================
  // 5. MEMOIZED FILTERATION ARRAYS
  // ==========================================
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompeleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompeleted;
    });
  }, [todos]);

  // Determine current dataset visibility filter path
  let todosToBeRendered = todos;
  if (displayTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // ==========================================
  // 6. ACTION & EVENT HANDLERS
  // ==========================================

  // Create / Push Entry Function
  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: inputTitle } });
    setInputTitle("");
    showHideToast("تمت الإضافه بنجاح");
  }

  // Toggle Visibility Layout Control
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // Delete Dialog Open Trigger
  function DeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  // Delete Dialog Dismiss Action
  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  // Delete Dialog Confirmation Action
  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: { id: dialogTodo.id } });
    setShowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح");
  }

  // Edit Dialog Open Trigger
  function editeDialog(todo) {
    setDialogTodo({ ...todo });
    setShowEditeDialog(true);
  }

  // Edit Dialog Dismiss Action
  function handleEidteClose() {
    setShowEditeDialog(false);
  }

  // Edit Dialog Confirmation Action
  function handleEditeConfirm() {
    dispatch({
      type: "edited",
      payload: {
        title: dialogTodo.title,
        description: dialogTodo.description,
        id: dialogTodo.id,
      },
    });
    setShowEditeDialog(false);
    showHideToast("تم التعديل بنجاح");
  }

  // --- Map Todo Component Nodes ---
  const todoJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={DeleteDialog}
        showEdite={editeDialog}
      />
    );
  });

  // ==========================================
  // 7. RENDER USER INTERFACE
  // ==========================================
  return (
    <>
      {/* --- Delete Confirmation Dialog Modal --- */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem" }}
        >
          هل انت متأكد من رغبتك فى حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: isMobile ? "0.85rem" : "1rem" }}
          >
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus size="small">
            إغلاق
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" size="small">
            قم الحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Edit Core Task Details Dialog Modal --- */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={showEditeDialog}
        onClose={handleEidteClose}
        role="alertdialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem", fontWeight: "bold" }}
        >
          تعديل المهمه
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={dialogTodo?.title || ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
            slotProps={{
              input: { style: { fontSize: isMobile ? "14px" : "16px" } },
            }}
          />
          <TextField
            margin="dense"
            label="تفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo?.description || ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, description: e.target.value });
            }}
            slotProps={{
              input: { style: { fontSize: isMobile ? "14px" : "16px" } },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditeConfirm}
            autoFocus
            variant="contained"
            size="small"
          >
            تأكيد
          </Button>
          <Button onClick={handleEidteClose} size="small">
            إلغاء
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Main Application Control Dashboard --- */}
      <Container maxWidth="md" sx={{ px: isMobile ? 1 : isTablet ? 2 : 3 }}>
        <Card
          sx={{
            minWidth: isMobile ? "100%" : 275,
            background: "#00695c",
          }}
          style={{
            maxHeight: "85vh",
            overflowY: "auto",
            overflowX: "hidden",
            padding: isMobile ? "12px" : "16px",
            boxSizing: "border-box",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <CardContent style={{ padding: isMobile ? "4px" : "16px" }}>
            {/* Component Header Text */}
            <Typography
              sx={{
                fontWeight: "bold",
                // FIXED: Uses safe rem breakpoints instead of vw to keep font sized correctly on tablets
                fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3.5rem" },
              }}
              className="c-white"
              variant="h2"
            >
              مهامى
            </Typography>
            <Divider className="bg-white" sx={{ opacity: 0.3, my: 1 }} />

            {/* Filter Navigation Toggle Bar */}
            <ToggleButtonGroup
              value={displayTodosType}
              style={{
                direction: "ltr",
                marginTop: "10px",
                background: "white",
                borderRadius: "8px",
                width: "100%",
              }}
              exclusive
              color="primary"
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton
                sx={{
                  // Scales font sizing step-by-step cleanly without lines breaking
                  fontSize: { xs: "13px", sm: "16px", md: "18px" },
                  fontWeight: "bold",
                  flex: 1,
                  whiteSpace: "nowrap",
                }}
                value="non-completed"
                aria-label="left aligned"
              >
                غير منجز
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: { xs: "13px", sm: "16px", md: "18px" },
                  fontWeight: "bold",
                  flex: 1,
                  whiteSpace: "nowrap",
                }}
                value="completed"
                aria-label="centered"
              >
                منجز
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: { xs: "13px", sm: "16px", md: "18px" },
                  fontWeight: "bold",
                  flex: 1,
                  whiteSpace: "nowrap",
                }}
                value="all"
                aria-label="right aligned"
              >
                الكل
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Injected Task Row Array Mount Target */}
            {todoJsx}

            {/* Task Creation Input Panel Grid */}
            <Grid
              style={{ marginTop: "20px" }}
              container
              spacing={isMobile ? 1 : 2}
              sx={{ direction: "rtl" }}
            >
              <Grid
                size={isMobile ? 9 : isTablet ? 9 : 8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={inputTitle}
                  onChange={(e) => {
                    setInputTitle(e.target.value);
                  }}
                  className="add-title"
                  fullWidth
                  id="outlined-basic"
                  label="عنوان المهام"
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                  slotProps={{
                    input: { style: { fontSize: isMobile ? "13px" : "16px" } },
                    inputLabel: {
                      style: { fontSize: isMobile ? "13px" : "16px" },
                    },
                  }}
                  sx={{
                    input: { color: "#333" },
                    "& .MuiInputLabel-root": {
                      right: 16,
                      left: "auto",
                      transformOrigin: "top right",
                    },
                    "& .MuiOutlinedInput-notchedOutline legend": {
                      textAlign: "right",
                    },
                  }}
                />
              </Grid>
              <Grid
                size={isMobile ? 3 : isTablet ? 3 : 4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: isMobile ? "40px" : "56px",
                    backgroundColor: "#004d40",
                    fontWeight: "bold",
                    fontSize: isMobile ? "13px" : "16px",
                  }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={inputTitle.length <= 5}
                >
                  إضافه
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
