import api from './api'

const normalizeAddress = (
    address,
) => {
    return {
        id: address.id,

        addressType:
            address.address_type,

        fullName:
            address.full_name,

        phone:
            address.phone,

        addressLine:
            address.address_line,

        city:
            address.city,

        state:
            address.state,

        pincode:
            address.pincode,

        isDefault:
            Boolean(
                address.is_default,
            ),

        createdAt:
            address.created_at,

        updatedAt:
            address.updated_at,
    }
}

export const getAddresses =
    async () => {
        const response =
            await api.get(
                '/auth/addresses/',
            )

        const data =
            response.data

        const results =
            data?.results ||
            data ||
            []

        return results.map(
            normalizeAddress,
        )
    }

export const createAddress =
    async ({
        addressType,
        fullName,
        phone,
        addressLine,
        city,
        state,
        pincode,
        isDefault = false,
    }) => {
        const response =
            await api.post(
                '/auth/addresses/',
                {
                    address_type:
                        addressType,

                    full_name:
                        fullName,

                    phone,

                    address_line:
                        addressLine,

                    city,

                    state,

                    pincode,

                    is_default:
                        isDefault,
                },
            )

        return normalizeAddress(
            response.data,
        )
    }

export const updateAddress =
    async (
        addressId,
        {
            addressType,
            fullName,
            phone,
            addressLine,
            city,
            state,
            pincode,
            isDefault,
        },
    ) => {
        const response =
            await api.patch(
                `/auth/addresses/${addressId}/`,
                {
                    address_type:
                        addressType,

                    full_name:
                        fullName,

                    phone,

                    address_line:
                        addressLine,

                    city,

                    state,

                    pincode,

                    is_default:
                        isDefault,
                },
            )

        return normalizeAddress(
            response.data,
        )
    }

export const deleteAddress =
    async (
        addressId,
    ) => {
        await api.delete(
            `/auth/addresses/${addressId}/`,
        )
    }