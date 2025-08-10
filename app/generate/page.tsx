"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { buyShipping, generateShipping } from "../actions";

import { title } from "@/components/primitives";
import { AddressForm } from "@/components/generate/address-form";
import { ParcelForm } from "@/components/generate/parcel-form";
import {
  TabsValueType,
  ParcelInput,
  GenerateState,
  AddressInput,
} from "@/types/generate";
import { GenerateShippingPropsSchema, ShippingSchema } from "@/types/shipping";
import { searchParamsSerializer } from "@/config/search-params";
import { siteConfig } from "@/config/site";

export const TabsValue = {
  To: "To",
  From: "From",
  Parcel: "Parcel",
  Result: "Result",
} as const;

const ShippingTabsMap = {
  [TabsValue.To]: "to_address",
  [TabsValue.From]: "from_address",
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
  country: "US",
  mode: "test",
};

export default function Generate() {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<TabsValueType>(TabsValue.To);
  const [generateData, setGenerateData] = useState<GenerateState>({
    to_address: initialAddressForm,
    from_address: initialAddressForm,
  });

  const { push } = useRouter();

  const handleNext = (formData: AddressInput, nextStep: TabsValueType) => {
    setGenerateData((p) => ({ ...p, [ShippingTabsMap[tab]]: formData }));
    setTab(nextStep);
  };

  const handleSubmit = async (parcelData: ParcelInput) => {
    try {
      setLoading(true);
      const parsed = GenerateShippingPropsSchema.parse({
        shipment: {
          to_address: generateData.to_address,
          from_address: generateData.from_address,
          parcel: parcelData,
          mode: "test",
        },
      });

      const generateResponse = await generateShipping(parsed);

      if (generateResponse.error) {
        throw new Error(generateResponse.error.message);
      }
      const parsedData = ShippingSchema.parse(generateResponse.data);

      const rates = parsedData.rates;

      if (!rates.length) {
        throw new Error("No rates found");
      }

      let selectedRate = rates.find((rate) => rate.carrier === "usps");

      if (!selectedRate) {
        // throw new Error("No USPS rate found");
        selectedRate = rates[0];
      }
      const buyResponse = await buyShipping({
        rateId: selectedRate.id,
        shipmentId: selectedRate.shipment_id,
      });

      if (buyResponse.error) {
        throw new Error(buyResponse.error.message);
      }
      const parsedBuyResponse = ShippingSchema.parse(buyResponse.data);
      const params = searchParamsSerializer({
        carrier: selectedRate.carrier,
        label: parsedBuyResponse.postage_label?.label_url,
      });

      push(siteConfig.routes.result + params);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setLoading(false);
    }
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
          destroyInactiveTabPanel={false}
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key as TabsValueType)}
        >
          <Tab
            key={TabsValue.To}
            //  disabled={tab !== TabsValue.To}
            title={TabsValue.To}
          >
            <AddressForm
              handleNext={handleNext}
              nextStep={TabsValue.From}
              title="Data of the recipient"
            />
          </Tab>
          <Tab
            key={TabsValue.From}
            //   disabled={tab !== TabsValue.From}
            title={TabsValue.From}
          >
            <AddressForm
              handleNext={handleNext}
              nextStep={TabsValue.Parcel}
              title="Data of the sender"
            />
          </Tab>
          <Tab
            key={TabsValue.Parcel}
            //   disabled={tab !== TabsValue.Parcel}
            title={TabsValue.Parcel}
          >
            <ParcelForm handleNext={handleSubmit} />
          </Tab>

          <Tab
            key={TabsValue.Result}
            disabled={tab !== TabsValue.Result}
            title={TabsValue.Result}
          >
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
