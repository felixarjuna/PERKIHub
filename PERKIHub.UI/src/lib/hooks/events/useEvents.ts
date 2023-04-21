import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents, joinEvent } from "../../api/api";

export const useJoinEvent = () => {
  const queryClient = useQueryClient();

  const onJoinEvent = useMutation(joinEvent, {
    onSuccess: () => queryClient.invalidateQueries(["events"]),
  });

  return { onJoinEvent };
};

export const useEvents = (query: string = "") => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(query),
  });

  return { events, isLoading };
};
