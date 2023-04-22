import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  getUser,
  getUserProfilePicture,
  updateUser,
  upsertProfilePicture,
} from "../../../../lib/api/api";
import { useAuth } from "../../../../lib/hooks/useAuth";

export const useProfile = (userID: string) => {
  const queryClient = useQueryClient();
  const { currentUser, onChangeUser } = useAuth();

  const onUpdateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateUser,
    onSuccess: data => {
      onChangeUser({ ...data, profilePicture: null });
    },
  });

  const onLoadProfile = useQuery(["user"], () => getUser(userID));

  const { data: profilePicture } = useQuery({
    queryKey: ["profile-picture"],
    queryFn: () => getUserProfilePicture(userID),
    enabled: !isEmpty(userID),
    initialData: null,
    onSuccess: data => {
      onChangeUser({
        id: currentUser?.id ?? "",
        firstName: currentUser?.firstName ?? "",
        lastName: currentUser?.lastName ?? "",
        email: currentUser?.email ?? "",
        profilePicture: data,
      });
    },
  });

  const onUpdateProfilePicture = useMutation({
    mutationKey: ["profile-picture"],
    mutationFn: upsertProfilePicture,
    onSuccess: () => queryClient.invalidateQueries(["profile-picture"]),
  });

  return {
    onLoadProfile,
    profilePicture,
    onUpdateProfile,
    onUpdateProfilePicture,
  };
};
