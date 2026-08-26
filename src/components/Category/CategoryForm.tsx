import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { addCategoryAsync, updateCategoryAsync } from "../../api/category";
import { addUpdateCategorySchema } from "../../schemas/category";
import { getFieldError } from "../../utils/auth";
import { capitalizeWord } from "../../utils/format";
import { typeOptions } from "../../constants/category";
import type { TCategoryForm } from "../../types/category";
import type { TErrors } from "../../types/ui";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import ErrorMessage from "../ui/Error";
import "../../styles/expense/expense-form.scss";

const CategoryForm = ({
  data,
  action,
  closeModalFn,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: TCategoryForm) => {
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const nameError = getFieldError("name", errors);
  const typeError = getFieldError("type", errors);

  const isUpdate = action === "update";
  const title = `${capitalizeWord(action)} Category`;
  const description = isUpdate
    ? "Update the category details below."
    : "Enter the category details below.";
  const submitLabel = isUpdate ? "Update Category" : "Add Category";

  const submitCategory = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      Name: formData.get("name") as string,
      Type: formData.get("type"),
    };

    const validation = addUpdateCategorySchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    const validatedPayload = validation.data;

    if (isUpdate && data?.id) {
      return await updateCategoryAsync(data.id, validatedPayload);
    }

    return await addCategoryAsync(validatedPayload);
  };

  const mutation = useMutation({
    mutationFn: submitCategory,

    onSuccess: (response) => {
      queryClient.setQueryData(["category", response.data.id], response.data);

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success(
        isUpdate
          ? "Category record successfully updated"
          : "Category record successfully added",
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
      className={`category-form ${action}`}
    >
      <div className="form-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Input
        label="Category Name"
        name="name"
        placeholder="Enter category name"
        defaultValue={data?.name}
        errorMessage={nameError && nameError.messages[0]}
      />
      <Dropdown
        name="type"
        label="Type"
        options={typeOptions}
        defaultOption={
          data?.type !== undefined
            ? {
                value: data.type,
                label: data.type === 0 ? "Expense" : "Income",
              }
            : undefined
        }
        errorMessage={typeError && typeError.messages[0]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
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

export default CategoryForm;
