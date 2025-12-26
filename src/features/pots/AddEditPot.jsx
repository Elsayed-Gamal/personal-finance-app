import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import AddEditPotForm from "./AddEditPotForm";
import { addPot, editPot } from "../../services/apiPots";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import Loading from "../../ui/Loading";
import Message from "../../ui/Message";

function AddEditPot({ type, pot }) {
  const queryClient = useQueryClient();

  const { close } = useContext(ModalContext);

  const potName = pot?.name || "";
  const potTarget = pot?.target || "";
  const potTheme = pot?.theme || "";

  const {
    mutate: addPotMutate,
    error: addPotError,
    isPending: addPotIsPending,
    isError: addPotIsError,
  } = useMutation({
    mutationFn: addPot,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["pots"] });
      close();
    },
  });

  const {
    mutate: editPotMutate,
    error: editPotError,
    isPending: editPotIsPending,
    isError: editPotIsError,
  } = useMutation({
    mutationFn: editPot,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["pots"] });
      close();
    },
  });

  const methods = useForm();

  const onSubmit = (data) => {
    if (type === "edit") {
      const updatedFields = {
        name: data.potName,
        target: +data.potTarget,
        theme: data.potTheme,
      };

      editPotMutate({ potName, updatedFields });
    } else if (type === "add") {
      const potData = {
        name: data.potName,
        target: +data.potTarget,
        total: 0,
        theme: data.potTheme,
      };

      addPotMutate(potData);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-grey-900" style={{ font: "var(--text-preset-1)" }}>
        {type === "add" ? "Add New Pot" : "Edit Pot"}
      </h2>
      <p className="text-grey-500" style={{ font: "var(--text-preset-4)" }}>
        {type === "add"
          ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          : "If your saving targets change, feel free to update your pots."}
      </p>
      {addPotIsPending || editPotIsPending ? (
        <Loading />
      ) : addPotIsError || editPotIsError ? (
        <Message type="error">
          {addPotError?.message || editPotError?.message}
        </Message>
      ) : (
        <>
          <AddEditPotForm
            type={type}
            methods={methods}
            potName={potName}
            potTarget={potTarget}
            potTheme={potTheme}
          />
          <button
            onClick={methods.handleSubmit(onSubmit)}
            disabled={addPotIsPending || editPotIsPending}
            className="bg-grey-900 w-full cursor-pointer rounded-lg p-4 text-white"
            style={{ font: "var(--text-preset-4-bold)" }}
          >
            {type === "add" ? "Add Pot" : "Save Changes"}
          </button>
        </>
      )}
    </div>
  );
}

export default AddEditPot;
