"use server";

import {
  BuyShippingProps,
  GenerateShippingProps,
  Shipping,
} from "@/types/shipping";
import { ApiResponse } from "@/types/api";

const API_URL = process.env.EASYPOST_API_URL;
const API_KEY = process.env.EASYPOST_API_KEY;

const requestHeaders = {
  Authorization: `Basic ${Buffer.from(API_KEY || "").toString("base64")}`,
  "Content-Type": "application/json",
};

export async function generateShipping(
  shipment: GenerateShippingProps,
): Promise<ApiResponse<Shipping>> {
  const shipmentResponse = await fetch(`${API_URL}/shipments`, {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(shipment),
  });

  const shipmentData = await shipmentResponse.json();

  if (shipmentResponse.status >= 400) {
    return {
      data: undefined,
      error: shipmentData,
    };
  }

  return {
    data: shipmentData,
    error: undefined,
  };
}

export async function buyShipping(props: BuyShippingProps) {
  const buyResponse = await fetch(
    `${API_URL}/shipments/${props.shipmentId}/buy`,
    {
      headers: requestHeaders,
      method: "POST",
      body: JSON.stringify({
        rate: {
          id: props.rateId,
        },
        insurance: props?.insurance,
      }),
    },
  );

  const buyData = await buyResponse.json();

  if (buyResponse.status >= 400) {
    return {
      data: undefined,
      error: buyData,
    };
  }

  return {
    data: buyData,
    error: undefined,
  };
}
