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
  const { onChangeUser } = useAuth();

  const onUpdateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateUser,
    onSuccess: data => {
      onChangeUser(data);
    },
  });

  const onLoadProfile = useQuery(["user"], () => getUser(userID));

  const { data: profilePicture } = useQuery({
    queryKey: ["profile-picture"],
    queryFn: () => getUserProfilePicture(userID),
    enabled: !isEmpty(userID),
    initialData: null,
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
