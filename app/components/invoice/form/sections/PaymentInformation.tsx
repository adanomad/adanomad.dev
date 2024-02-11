"use client";

// Components
import { FormInput, Subheading } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

const PaymentInformation = () => {
    const { _t } = useTranslationContext();
    return (
        <section>
            <Subheading>{_t("form.steps.paymentInfo.heading")}:</Subheading>
            <div className="flex flex-wrap gap-10 mt-5">
                <FormInput
                    name="details.paymentInformation.bankName"
                    label={_t("form.steps.paymentInfo.bankName")}
                    placeholder={_t("form.steps.paymentInfo.bankName")}
                    vertical
                />
                <FormInput
                    name="details.paymentInformation.bankAddress"
                    label={_t("form.steps.paymentInfo.bankAddress")}
                    placeholder={_t("form.steps.paymentInfo.bankAddress")}
                    vertical
                />
                <FormInput
                    name="details.paymentInformation.accountType"
                    label={_t("form.steps.paymentInfo.accountType")}
                    placeholder={_t("form.steps.paymentInfo.accountType")}
                    vertical
                />
                <FormInput
                    name="details.paymentInformation.routingNumber"
                    label={_t("form.steps.paymentInfo.routingNumber")}
                    placeholder={_t("form.steps.paymentInfo.routingNumber")}
                    vertical
                />
                <FormInput
                    name="details.paymentInformation.accountNumber"
                    label={_t("form.steps.paymentInfo.accountNumber")}
                    placeholder={_t("form.steps.paymentInfo.accountNumber")}
                    vertical
                />
            </div>
        </section>
    );
};


export default PaymentInformation;
