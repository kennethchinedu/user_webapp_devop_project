"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
  Select,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IUser } from "@/app/types";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllUsersQuery,
} from "@/app/store/Features/users/usersApiSlice";
import { useGetAllRolesQuery } from "@/app/store/Features/roles/rolesApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/store/Features/auth/authSlice";
import { editUserSchema, userSchema } from "@/app/utils/validation";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: allUsersData,
    isLoading: isLoadingUsers,
    refetch,
  } = useGetAllUsersQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const {
    data: allRoles,
    isLoading: isLoadingRoles,
    refetch: refetchRoles,
  } = useGetAllRolesQuery();

  useEffect(() => {
    refetch();
    if (allUsersData) {
      setUsers(allUsersData);
    }
  }, [allUsersData, page, rowsPerPage]);

  useEffect(() => {
    refetchRoles();
  }, []);

  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  const validate = () => {
    const result = userSchema.safeParse(currentUser);

    if (!result.success) {
      const errorObj: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errorObj[error.path[0] as string] = error.message;
        }
      });
      setErrors(errorObj);
      return false;
    }
    setErrors({});
    return true;
  };

  const validateEdit = () => {
    const result = editUserSchema.safeParse(currentUser);

    if (!result.success) {
      const errorObj: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errorObj[error.path[0] as string] = error.message;
        }
      });
      setErrors(errorObj);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleOpenAdd: any = (user: IUser | null) => {
    setOpenAdd(true);
    setCurrentUser(
      user || {
        email: "",
        userName: "",
        roleId: "",
        status: "",
        password: "",
        id: "",
        createdAt: new Date(),
        deleted: false,
        role: "",
        updatedAt: new Date(),
      }
    );
    setErrors({});
  };

  const handleOpenEdit: any = (user: IUser | null) => {
    setCurrentUser(user);
    setOpenEdit(true);
    setErrors({});
  };

  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setCurrentUser(null);
    setIsLoading(false);
  };

  const handleSaveUser = async () => {
    if (!validate()) return;

    setIsLoading(true);
    if (currentUser) {
      try {
        const { success, message, payload } = await createUser({
          email: currentUser.email,
          roleId: currentUser.roleId,
          userName: currentUser.userName,
          status: currentUser.status,
          password: currentUser.password,
        }).unwrap();

        if (success) {
          toast.success(`${message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          refetch();
          handleClose();
        } else {
          toast.error(`${message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);

        let msg =
          error.message ||
          (error.data && error.data.message) ||
          "An error occurred";
        toast.error(`${msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (currentUser.id) {
      } else {
      }
    }
  };

  const handleEditUser = async () => {
    if (!validateEdit()) return;

    setIsLoading(true);
    if (currentUser) {
      if (currentUser.id) {
        const { id, roleId, status } = currentUser;

        try {
          const { success, message, payload } = await editUser({
            id,
            roleId,
            status,
          }).unwrap();

          if (success) {
            toast.success(`${message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            refetch();
            handleClose();
          } else {
            toast.error(`${message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsLoading(false);
          }
        } catch (error: any) {
          setIsLoading(false);

          let msg =
            error.message ||
            (error.data && error.data.message) ||
            "An error occurred";
          toast.error(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const { success, message, payload } = await deleteUser(id).unwrap();

      if (success) {
        toast.success(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
        handleClose();
      } else {
        toast.error(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      let msg =
        error.message ||
        (error.data && error.data.message) ||
        "An error occurred";
      toast.error(`${msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogout = async () => {
    dispatch(logOut({}));

    toast.info(`Log out successful`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => handleLogout()}
          size="small"
        >
          Logout
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenAdd(null)}
      >
        Add User
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle>{"Add User"}</DialogTitle>
        {Object.keys(errors).length > 0 && (
          <Box mt={2} ml={3}>
            {Object.entries(errors).map(([field, message]) => (
              <Typography key={field} color="error">
                {message}
              </Typography>
            ))}
          </Box>
        )}

        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            value={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="User Name"
            fullWidth
            margin="dense"
            value={currentUser?.userName || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, userName: e.target.value })
            }
            error={!!errors.userName}
            helperText={errors.userName}
          />
          <TextField
            label="Role"
            select
            fullWidth
            margin="dense"
            value={currentUser?.roleId || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, roleId: e.target.value })
            }
            error={!!errors.roleId}
            helperText={errors.roleId}
          >
            {allRoles?.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            fullWidth
            margin="dense"
            value={currentUser?.status || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, status: e.target.value })
            }
            error={!!errors.status}
            helperText={errors.status}
          />
          {!currentUser?.id && (
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="dense"
              value={currentUser?.password || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser!, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>

          <Button onClick={handleSaveUser} color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>{"Edit User"}</DialogTitle>
        {Object.keys(errors).length > 0 && (
          <Box mt={2} ml={3}>
            {Object.entries(errors).map(([field, message]) => (
              <Typography key={field} color="error">
                {message}
              </Typography>
            ))}
          </Box>
        )}
        <DialogContent>
          <TextField
            label="Role"
            select
            fullWidth
            margin="dense"
            value={currentUser?.roleId || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, roleId: e.target.value })
            }
            error={!!errors.roleId}
            helperText={errors.roleId}
          >
            {allRoles?.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            fullWidth
            margin="dense"
            value={currentUser?.status || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser!, status: e.target.value })
            }
            error={!!errors.status}
            helperText={errors.status}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditUser} color="primary">
            {isLoading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
