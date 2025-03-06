import Swal from "sweetalert2";
import useSWR from "swr";

function useFetchData(url) {
  const { data, error, isLoading, mutate } = useSWR(
    `${'http://localhost:9090'}${url}`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) {
       Swal.fire({
             title: "Error",
             text: "Hubo un problema en el servidor.",
             icon: "error",
           });
    return;
  }

  return { data, isLoading, mutate };
}

export default useFetchData;