import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { addExpenseAsync, updateExpenseAsync } from "../../api/expense";
import { addUpdateExpenseSchema } from "../../schemas/expense";
import { getFieldError } from "../../utils/auth";
import { capitalizeWord } from "../../utils/format";
import type { TExpenseForm } from "../../types/expense";
import type { TErrors } from "../../types/ui";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import ErrorMessage from "../ui/Error";
import "../../styles/expense/expense-form.scss";

const ExpenseForm = ({ data, action, closeModalFn }: TExpenseForm) => {
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const descriptionError = getFieldError("description", errors);
  const amountError = getFieldError("amount", errors);
  const categoryError = getFieldError("category", errors);

  const isUpdate = action === "update";
  const title = `${capitalizeWord(action)} Expense`;
  const description = isUpdate
    ? "Update the expense details below."
    : "Enter the expense details below.";
  const submitLabel = isUpdate ? "Update Expense" : "Add Expense";

  console.log("data:", data);

  const submitExpense = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      Description: formData.get("description") as string,
      Amount: Number(formData.get("amount")),
      Category: formData.get("category") as string,
    };

    const validation = addUpdateExpenseSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    if (isUpdate && data?.id) {
      return await updateExpenseAsync(data.id, payload);
    }

    return await addExpenseAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: submitExpense,

    onSuccess: (response) => {
      queryClient.setQueryData(["expense", response.data.id], response.data);

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      toast.success(
        isUpdate
          ? "Expense record successfully updated"
          : "Expense record successfully added",
      );

      closeModalFn();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage(error.response?.data.errorMessage);
        }
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(new FormData(e.currentTarget));
      }}
      className={`expense-form ${action}`}
    >
      <div className="form-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Input
        label="Category"
        name="category"
        placeholder="Enter category"
        defaultValue={data?.category}
        errorMessage={categoryError && categoryError.messages[0]}
      />
      <Input
        type="number"
        label="Amount"
        name="amount"
        placeholder="Enter amount"
        defaultValue={data?.amount?.toString()}
        errorMessage={amountError && amountError.messages[0]}
      />
      <TextArea
        label="Description"
        name="description"
        placeholder="Enter description"
        defaultValue={data?.description}
        errorMessage={descriptionError?.messages[0]}
      />
      <Button
        type="submit"
        label={submitLabel}
        style={isUpdate ? "warning" : "success"}
        showIcon={false}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </form>
  );
};

export default ExpenseForm;
