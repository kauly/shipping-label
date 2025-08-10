"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";

import { TabsValueType, Shipping, ParcelInput } from "@/types/generate";
import { AddressInput } from "@/types/generate";
import { title } from "@/components/primitives";
import { AddressForm } from "@/components/generate/address-form";

export const TabsValue = {
  To: "To",
  From: "From",
  Parcel: "Parcel",
  Result: "Result",
} as const;

const ShippingTabsMap = {
  [TabsValue.To]: "to_form",
  [TabsValue.From]: "from_form",
  [TabsValue.Parcel]: "parcel",
  [TabsValue.Result]: "result",
};

const initialAddressForm: AddressInput = {
  name: "",
  company: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};

const initialParcelForm: ParcelInput = {
  length: 0,
  width: 0,
  height: 0,
  predefined_package: null,
  weight: 0,
};

export default function Generate() {
  const [tab, setTab] = useState<TabsValueType>(TabsValue.To);
  const [generateData, setGenerateData] = useState<Shipping>({
    to_form: initialAddressForm,
    from_form: initialAddressForm,
    parcel: initialParcelForm,
  });

  const handleNext = (formData: AddressInput, nextStep: TabsValueType) => {
    setGenerateData((p) => ({ ...p, [ShippingTabsMap[tab]]: formData }));
    setTab(nextStep);
  };

  return (
    <section className="flex flex-col items-start justify-center gap-6 py-8 md:py-10">
      <p className={title({ size: "sm" })}>
        Follow the steps below to generate your shipping label
      </p>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Generate Tabs"
          className="w-full md:w-fit"
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key as TabsValueType)}
        >
          <Tab key={TabsValue.To} title={TabsValue.To}>
            <AddressForm
              handleNext={handleNext}
              initialForm={generateData.to_form}
              nextStep={TabsValue.From}
              title="Data of the recipient"
            />
          </Tab>
          <Tab key={TabsValue.From} title={TabsValue.From}>
            <AddressForm
              handleNext={handleNext}
              initialForm={generateData.from_form}
              nextStep={TabsValue.Parcel}
              title="Data of the sender"
            />
          </Tab>
          <Tab key={TabsValue.Parcel} title={TabsValue.Parcel}>
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
          <Tab key={TabsValue.Result} title={TabsValue.Result}>
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
