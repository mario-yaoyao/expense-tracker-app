import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { addIncomeAsync, updateIncomeAsync } from "../../api/income";
import { getCategoriesAsync } from "../../api/category";
import { addUpdateIncomeSchema } from "../../schemas/income";
import { getFieldError } from "../../utils/auth";
import { formatWord } from "../../utils/format";
import type { TIncomeForm } from "../../types/income";
import type { TCategoryDetails } from "../../types/category";
import type { TErrors } from "../../types/ui";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import ErrorMessage from "../ui/ErrorMessage";
import "../../styles/income/income-form.scss";

const IncomeForm = ({ data, action, closeModalFn }: TIncomeForm) => {
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const descriptionError = getFieldError("description", errors);
  const amountError = getFieldError("amount", errors);
  const categoryError = getFieldError("category", errors);

  const isUpdate = action === "update";
  const title = `${formatWord(action)} Income`;
  const description = isUpdate
    ? "Update the income details below."
    : "Enter the income details below.";
  const submitLabel = isUpdate ? "Update Income" : "Add Income";

  const {
    data: categoriesData,
    // isLoading,
    // isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategoriesAsync({
        type: 1,
        page: 1,
        limit: 100,
      });
    },
  });

  const categories = categoriesData?.data.items ?? [];

  const submitIncome = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      Description: formData.get("description") as string,
      Amount: Number(formData.get("amount")),
      CategoryId: Number(formData.get("categoryId")),
    };

    const validation = addUpdateIncomeSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    if (isUpdate && data?.id) {
      return await updateIncomeAsync(data.id, payload);
    }

    return await addIncomeAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: submitIncome,

    onSuccess: (response) => {
      queryClient.setQueryData(["income", response.data.id], response.data);

      queryClient.invalidateQueries({
        queryKey: ["incomes"],
      });

      toast.success(
        isUpdate
          ? "Income record successfully updated"
          : "Income record successfully added",
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
      className={`income-form ${action}`}
    >
      <div className="form-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Dropdown
        name="categoryId"
        label="Category"
        options={
          categories.map((c: TCategoryDetails) => ({
            id: c.id!,
            label: c.name!,
            value: c.id!,
          })) ?? []
        }
        defaultOption={
          data?.categoryId && data?.categoryName
            ? {
                value: data.categoryId,
                label: data.categoryName,
              }
            : undefined
        }
        errorMessage={categoryError?.messages[0]}
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

export default IncomeForm;
