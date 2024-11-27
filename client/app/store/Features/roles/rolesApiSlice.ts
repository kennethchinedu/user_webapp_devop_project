"use client";

import {
  IAllRolesAPIResponse,
  IAllUsersAPIResponse,
  IAllUsersDataResponse,
  IRole,
  IUser,
} from "@/app/types";
import { apiSlice } from "../../api/apiSlice";

export const rolesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query<IRole[], void>({
      query: () => ({
        url: "roles",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "roles" as const,
                id,
              })),
              { type: "roles", id: "LIST" },
            ]
          : [{ type: "roles", id: "LIST" }],
      transformResponse: (response: IAllRolesAPIResponse) => {
        return response.payload.roles;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllRolesQuery } = rolesApiSlice;
