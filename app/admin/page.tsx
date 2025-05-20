
import CalendarPanel from "../components/appointment/CalendarPanel";


export default async function Admin({ searchParams }: { searchParams: { status?: string } }) {
  const searchStatus = searchParams.status || "reservado";

  return (
    <CalendarPanel
      initialStatus={searchStatus}
    />
  );
}