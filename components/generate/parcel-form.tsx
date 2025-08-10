"use client";

import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { FormEvent } from "react";
import { Button } from "@heroui/button";
import { SparkleIcon } from "@phosphor-icons/react";

import { ParcelInputSchema, ParcelOutput } from "@/types/generate";

type ParcelFormProps = {
  handleNext: (formData: ParcelOutput) => void;
  isLoading: boolean;
};

export function ParcelForm({ handleNext, isLoading }: ParcelFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = ParcelInputSchema.parse(data);

    handleNext(parsed);
  };

  return (
    <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <p className="text-md font-semibold">Parcel Information</p>
        <div className="flex flex-col gap-4 w-xs md:w-sm">
          <Input
            label="Length"
            labelPlacement="outside"
            name="length"
            placeholder="Enter your length"
            type="text"
          />

          <Input
            label="Width"
            labelPlacement="outside"
            name="width"
            placeholder="Enter your width"
            type="text"
          />
          <Input
            label="Height"
            labelPlacement="outside"
            name="height"
            placeholder="Enter your height"
            type="text"
          />
          <Input
            label="Weight"
            labelPlacement="outside"
            name="weight"
            placeholder="Enter your weight"
            type="text"
          />
        </div>
      </div>
      <Button
        color="success"
        endContent={<SparkleIcon size={32} />}
        isLoading={isLoading}
        size="lg"
        type="submit"
      >
        Generate
      </Button>
    </Form>
  );
}
