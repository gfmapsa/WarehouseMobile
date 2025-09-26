import ContainerLayout from "@/warehouse/components/container/ContainerLayout";
import useContainer from "@/warehouse/hooks/useContainer";

export default function ContainerScreen() {
  const { data, isLoading, isError, refetch } = useContainer();

  return (
    <ContainerLayout
      data={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
}
