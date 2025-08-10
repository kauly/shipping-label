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
  handleNext: (formData: AddressInput, nextStep: TabsValueType) => void;
  nextStep: TabsValueType;
};

export function AddressForm({ title, handleNext, nextStep }: AddressFormProps) {
  const [cities, setCities] = useState<{ key: string; label: string }[]>([]);
  const [state, setState] = useState("");

  const handleStateChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const state = ev.target.value;

    setState(state);

    const cities = City.getCitiesOfState("US", state);

    if (cities.length) {
      const citiesMap = cities.map((city) => ({
        key: city.name,
        label: city.name,
      }));

      setCities(citiesMap);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const parsed = AddressInputSchema.parse({
      ...data,
      country: "US",
    });

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
          />

          <Input
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            label="Phone"
            labelPlacement="outside"
            name="phone"
            placeholder="Enter your phone"
            type="tel"
          />
          <Input
            label="Company"
            labelPlacement="outside"
            name="company"
            placeholder="Enter your company"
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-md font-semibold">Address</p>
        <div className="flex flex-col gap-4 w-xs md:w-sm">
          <Select
            isDisabled
            isRequired
            label="Country"
            labelPlacement="outside"
            name="country"
            placeholder="Enter your country"
            selectedKeys={["US"]}
          >
            <SelectItem key="US">United States</SelectItem>
          </Select>
          <Input
            isRequired
            label="Zip"
            labelPlacement="outside"
            name="zip"
            placeholder="Enter your zip"
            type="text"
          />
          <Select
            isRequired
            label="State"
            labelPlacement="outside"
            name="state"
            placeholder="Enter your state"
            selectedKeys={[state]}
            onChange={handleStateChange}
          >
            {states.map((state) => (
              <SelectItem key={state.key}>{state.label}</SelectItem>
            ))}
          </Select>
          <Select
            key={state}
            isRequired
            items={cities}
            label="City"
            labelPlacement="outside"
            name="city"
            placeholder="Enter your city"
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
          />
          <Input
            label="Street 2"
            labelPlacement="outside"
            name="street2"
            placeholder="Enter your street 2"
            type="text"
          />
        </div>
      </div>
      <Button color="secondary" size="lg" type="submit">
        Next
      </Button>
    </Form>
  );
}
