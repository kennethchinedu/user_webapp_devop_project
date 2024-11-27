import React from "react";
import { IChildren } from "../types";
import RequireUser from "../components/shared/RequireUser";

const UserListLayout: React.FC<IChildren> = ({ children }) => {
  return <RequireUser>{children}</RequireUser>;
};

export default UserListLayout;
