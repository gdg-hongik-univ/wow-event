import { FormProvider, useForm } from "react-hook-form";
import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import type { EventApplyDtoType } from "./types/event";

function App() {
  const method = useForm<EventApplyDtoType>({
    defaultValues: {
      eventId: undefined,
      participant: { name: undefined, studentId: undefined, phone: undefined },
      afterPartyApplicationStatus: undefined,
    },
  });

  return (
    <FormProvider {...method}>
      <RouterProvider router={Router} />
    </FormProvider>
  );
}

export default App;
