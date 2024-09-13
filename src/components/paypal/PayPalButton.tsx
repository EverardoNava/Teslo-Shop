"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
    orderId: string,
    amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    if (isPending) {
        return (
            <div className="animate-pulse mb-14">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-3" />
            </div>
        )
    }

    const rountedAmount = ((Math.round(amount * 100)) / 100).toString();

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: orderId,
                    amount: {
                        value: rountedAmount,
                        currency_code: "USD"
                    },
                },
            ]
        });

        // TODO: gaurdar el ID en la base de datos
        // setTransactionId

        const { ok } = await setTransactionId(orderId, transactionId);

        if (!ok) {
            throw new Error("No se pudo actualizar la orden");
        }


        return transactionId;
    }

    const onAprove = async (data: OnApproveData, actions: OnApproveActions) => {

        const details = await actions.order?.capture();
        if (!details) return;

        await paypalCheckPayment(details.id ?? "");

    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onAprove}
        />
    )
}
