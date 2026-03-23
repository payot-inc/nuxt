import { FetchError } from "ofetch";

export default function getToast() {
  const { $toast } = useNuxtApp();
  const error = (data: FetchError | string) => {
    const message = data instanceof FetchError ? data.message : data;
    return $toast.add({
      icon: "mdi:alert",
      color: "error",
      description: message,
    });
  };

  const success = (message: string) =>
    $toast.add({
      icon: "mdi:success",
      color: "success",
      description: message,
    });

  return {
    error,
    success,
    add: $toast.add,
  };
}
