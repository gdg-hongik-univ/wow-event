import { FormProvider, useForm } from "react-hook-form";
import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import type { FormSubmitDtoType } from "./types/form";

function App() {
  const method = useForm<FormSubmitDtoType>({
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
