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
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من رغبتك فى حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>
            إغلاق
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
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
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditeConfirm} autoFocus variant="contained">
            تأكيد
          </Button>
          <Button onClick={handleEidteClose}>إلغاء</Button>
        </DialogActions>
      </Dialog>

      {/* --- Main Application Control Dashboard --- */}
      <Container maxWidth="md">
        <Card
          sx={{
            minWidth: 275,
            background: "#00695c", // Swapped raw green out for your clean, premium theme deep teal
          }}
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "16px",
            boxSizing: "border-box",
            borderRadius: "12px", // Smooth professional curved corners
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <CardContent>
            {/* Component Header Text */}
            <Typography
              sx={{ fontWeight: "bold" }}
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
              }}
              exclusive
              color="primary"
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton
                sx={{ fontSize: "20px", fontWeight: "bold" }}
                value="non-completed"
                aria-label="left aligned"
              >
                غير منجز
              </ToggleButton>
              <ToggleButton
                sx={{ fontSize: "20px", fontWeight: "bold" }}
                value="completed"
                aria-label="centered"
              >
                منجز
              </ToggleButton>
              <ToggleButton
                sx={{ fontSize: "20px", fontWeight: "bold" }}
                value="all"
                aria-label="right aligned"
              >
                الكل
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Injected Task Row Array Mount Target */}
            {todoJsx}

            {/* Task Creation Input Panel Grid */}
            <Grid style={{ marginTop: "20px" }} container spacing={2}>
              <Grid
                size={8}
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
                  sx={{ input: { color: "#333" } }}
                />
              </Grid>
              <Grid
                size={4}
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
                    backgroundColor: "#004d40", // Dark accent teal contrast match
                    fontWeight: "bold",
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
