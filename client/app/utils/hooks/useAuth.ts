import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IDecoded } from "@/app/types";
import { RootState } from "@/app/store/store";
import { Role } from "@/app/enums";

const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  let isAdmin = false;
  let isUser = false;

  if (token) {
    const decoded: IDecoded = jwtDecode(token);

    const { role } = decoded;

    if (!role) return { isAdmin, isUser };

    switch (role) {
      case Role.user:
        isUser = true;
        break;

      case Role.admin:
        isAdmin = true;

        break;

      default:
        break;
    }

    return { isAdmin, isUser };
  }

  return { isAdmin, isUser };
};

export default useAuth;
