"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { State, City } from "country-state-city";
import { ChangeEvent, FormEvent, useState } from "react";

import {
  AddressInput,
  AddressInputSchema,
  TabsValueType,
} from "@/types/generate";

const states = State.getStatesOfCountry("US").map((state) => ({
  key: state.isoCode,
  label: state.name,
}));

type AddressFormProps = {
  title: string;
  initialForm: AddressInput;
  handleNext: (formData: AddressInput, nextStep: TabsValueType) => void;
  nextStep: TabsValueType;
};

export function AddressForm({
  title,
  initialForm,
  handleNext,
  nextStep,
}: AddressFormProps) {
  const [form, setForm] = useState<AddressInput>(initialForm);
  const [cities, setCities] = useState<{ key: string; label: string }[]>([]);

  const handleStateChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const state = ev.target.value;

    const cities = City.getCitiesOfState("US", state);

    setCities(
      cities.map((city) => ({
        key: city.name,
        label: city.name,
      })),
    );
    setForm((p) => ({ ...p, state }));
  };

  const handleCityChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const city = ev.target.value;

    setForm((p) => ({ ...p, city }));
  };

  const handleFormChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const parsed = AddressInputSchema.parse(data);

    handleNext(parsed, nextStep);
  };

  return (
    <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <p className="text-lg font-semibold">{title}</p>
      <div className="flex flex-col gap-4">
        <p className="text-md font-semibold">Personal Information (optional)</p>
        <div className="flex flex-col gap-4 w-xs md:w-sm">
          <Input
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter your name"
            type="text"
            value={form.name || ""}
            onChange={handleFormChange}
          />

          <Input
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={form.email || ""}
            onChange={handleFormChange}
          />
          <Input
            label="Phone"
            labelPlacement="outside"
            name="phone"
            placeholder="Enter your phone"
            type="tel"
            value={form.phone || ""}
            onChange={handleFormChange}
          />
          <Input
            label="Company"
            labelPlacement="outside"
            name="company"
            placeholder="Enter your company"
            type="text"
            value={form.company || ""}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-md font-semibold">Address</p>
        <div className="flex flex-col gap-4 w-xs md:w-sm">
          <Input
            isRequired
            label="Zip"
            labelPlacement="outside"
            name="zip"
            placeholder="Enter your zip"
            type="text"
            value={form.zip || ""}
            onChange={handleFormChange}
          />
          <Select
            isRequired
            label="State"
            labelPlacement="outside"
            name="state"
            placeholder="Enter your state"
            selectedKeys={[form.state]}
            onChange={handleStateChange}
          >
            {states.map((state) => (
              <SelectItem key={state.key}>{state.label}</SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            items={cities}
            label="City"
            labelPlacement="outside"
            name="city"
            placeholder="Enter your city"
            selectedKeys={[form.city]}
            onChange={handleCityChange}
          >
            {(city) => <SelectItem key={city.key}>{city.label}</SelectItem>}
          </Select>
          <Input
            isRequired
            label="Street 1"
            labelPlacement="outside"
            name="street1"
            placeholder="Enter your street 1"
            type="text"
            value={form.street1}
            onChange={handleFormChange}
          />
          <Input
            label="Street 2"
            labelPlacement="outside"
            name="street2"
            placeholder="Enter your street 2"
            type="text"
            value={form.street2 || ""}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <Button color="secondary" size="lg" type="submit">
        Next
      </Button>
    </Form>
  );
}
