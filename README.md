# Shipping Label

Application to generate shipping labels using the USPS API. To generate a valid response you need to provide a valid zip code and the state of the zip code. For instance:

 - `zipCode`: `94597`
 - `state`: `CA`
 - `city`: `Acalanes Ridge`

Or

 - `zipCode`: `93510`
 - `state`: `CA`
 - `city`: `Acton`

## Development

This project is using pnpm as the package manager. To install the dependencies run:

```bash
pnpm install
```

To run the development server run:

```bash
pnpm run dev
```

## Environment variables

You need to provide the following environment variables:

- `USPS_API_KEY`: The API key for the USPS API.
- `EASYPOST_API_URL`: The API URL for the EasyPost API (default: `https://api.easypost.com/v2`).

You can create a `.env.local` file in the root of the project to provide the environment variables.


## Improvements

- [ ] Better UI
- [ ] Implement tests
- [ ] User registration
- [ ] Address and parcel history
- [ ] Multiple addresses
- [ ] Multiple parcels
- [ ] Shipping label customizations
- [ ] Better form validation
- [ ] Zip Code api for auto complete

## Demo

https://shipping-label-rho.vercel.app/


