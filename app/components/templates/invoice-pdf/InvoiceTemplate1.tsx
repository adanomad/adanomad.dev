import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate = (data: InvoiceType) => {
  const { sender, receiver, details } = data;

  return (
    <InvoiceLayout data={data}>
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl md:text-xl font-semibold text-gray-800">
            Invoice{" "}
            <span className="mt-1 text-gray-500">{details.invoiceNumber}</span>
          </h2>
          {details.invoiceLogo && (
            <img
              src={details.invoiceLogo}
              width={140}
              height={100}
              alt={`Logo of ${sender.name}`}
            />
          )}
        </div>
        <div className="text-right">
          <h2 className="text-lg md:text-xl font-semibold text-blue-600">
            {sender.name}
          </h2>
          <address className="mt-4 not-italic text-gray-500">
            {sender.address}
            <br />
            {sender.city} {sender.state}
            <br />
            {sender.country} {sender.zipCode}
            <br />
            <a href={`mailto:${sender.email}`}>{sender.email}</a>
            <br />
            <a href={`tel:${sender.phone}`}>{sender.phone}</a>
            <a href={`website:${sender.website}`}>{sender.website}</a>
          </address>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            For: <span className="text-blue-600">{receiver.name}</span>
          </h3>
          <address className="mt-2 not-italic text-gray-500">
            {receiver.address} {receiver.zipCode}
            <br />
            {receiver.city} {receiver.state} {receiver.country}
            <br />
            <a href={`mailto:${receiver.email}`}>{receiver.email}</a>
            <br />
            <a href={`tel:${receiver.phone}`}>{receiver.phone}</a>
            <a href={`website:${receiver.website}`}>{receiver.website}</a>
          </address>
        </div>
        <div className="sm:text-right space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-6 gap-x-3">
              <dt className="col-span-3 font-semibold text-gray-800">
                Invoice date:
              </dt>
              <dd className="col-span-3 text-gray-500">
                {new Date(details.invoiceDate).toLocaleDateString(
                  "en-US",
                  DATE_OPTIONS
                )}
              </dd>
            </dl>
            <dl className="grid sm:grid-cols-6 gap-x-3">
              <dt className="col-span-3 font-semibold text-gray-800">
                Due date:
              </dt>
              <dd className="col-span-3 text-gray-500">
                {new Date(details.dueDate).toLocaleDateString(
                  "en-US",
                  DATE_OPTIONS
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="border border-gray-200 p-1 rounded-lg space-y-1">
          <div className="hidden sm:grid sm:grid-cols-5">
            <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
              Item
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase">
              Qty
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase">
              Rate
            </div>
            <div className="text-right text-xs font-medium text-gray-500 uppercase">
              Total
            </div>
          </div>
          <div className="hidden sm:block border-b border-gray-200"></div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-1">
            {details.items.map((item, index) => (
              <React.Fragment key={index}>
                <div className="col-span-full sm:col-span-2 border-b border-gray-300">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
                <div className="border-b border-gray-300">
                  <p className="text-xs text-gray-800">{item.quantity}</p>
                </div>
                <div className="border-b border-gray-300">
                  <p className="text-xs text-gray-800">
                    {item.unitPrice} {details.currency}
                  </p>
                </div>
                <div className="border-b border-gray-300">
                  <p className="text-xs sm:text-right text-gray-800">
                    {item.total} {details.currency}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="sm:hidden border-b border-gray-200"></div>
        </div>
      </div>

      <div className="mt-2 flex sm:justify-end">
        <div className="sm:text-right space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3">
              <dt className="col-span-3 font-semibold text-gray-800">
                Subtotal:
              </dt>
              <dd className="col-span-2 text-gray-500">
                {formatNumberWithCommas(Number(details.subTotal))}{" "}
                {details.currency}
              </dd>
            </dl>
            {details.discountDetails?.amount != undefined &&
              details.discountDetails?.amount > 0 && (
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Discount:
                  </dt>
                  <dd className="col-span-2 text-gray-500">
                    {details.discountDetails.amountType === "amount"
                      ? `- ${details.discountDetails.amount} ${details.currency}`
                      : `- ${details.discountDetails.amount}%`}
                  </dd>
                </dl>
              )}
            {details.taxDetails?.amount != undefined &&
              details.taxDetails?.amount > 0 && (
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Tax:
                  </dt>
                  <dd className="col-span-2 text-gray-500">
                    {details.taxDetails.amountType === "amount"
                      ? `+ ${details.taxDetails.amount} ${details.currency}`
                      : `+ ${details.taxDetails.amount}%`}
                  </dd>
                </dl>
              )}
            {details.shippingDetails?.cost != undefined &&
              details.shippingDetails?.cost > 0 && (
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Shipping:
                  </dt>
                  <dd className="col-span-2 text-gray-500">
                    {details.shippingDetails.costType === "amount"
                      ? `+ ${details.shippingDetails.cost} ${details.currency}`
                      : `+ ${details.shippingDetails.cost}%`}
                  </dd>
                </dl>
              )}
            <dl className="grid sm:grid-cols-5 gap-x-3">
              <dt className="col-span-3 font-semibold text-gray-800">Total:</dt>
              <dd className="col-span-2 text-gray-500">
                {formatNumberWithCommas(Number(details.totalAmount))}{" "}
                {details.currency}
              </dd>
            </dl>
            {details.totalAmountInWords && (
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">
                  Total in words:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  <em>
                    {details.totalAmountInWords} {details.currency}
                  </em>
                </dd>
              </dl>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="my-4">
          <div className="my-2">
            <p className="text-blue-600">
              Additional notes:{" "}
              <span className="text-gray-800">{details.additionalNotes}</span>
            </p>
          </div>
          <div className="my-2">
            <p className="text-blue-600">
              Payment terms:{" "}
              <span className="text-gray-800">{details.paymentTerms}</span>
            </p>
          </div>

          <div className="my-2">
            <span className="text-md text-gray-800">
              Please wire or ACH the payment to:
              <table className="text-sm">
                <tbody>
                  <tr>
                    <td>Bank Name:</td>
                    <td>
                      <strong>{details.paymentInformation?.bankName}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Account Name:</td>
                    <td>
                      <strong>{details.paymentInformation?.accountName}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Bank Address:</td>
                    <td>
                      <strong>{details.paymentInformation?.bankAddress}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Account Type:</td>
                    <td>
                      <strong>{details.paymentInformation?.accountType}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Routing no:</td>
                    <td>
                      <strong>
                        {details.paymentInformation?.routingNumber}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Account no:</td>
                    <td>
                      <strong>
                        {details.paymentInformation?.accountNumber}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          If you have any questions about this invoice, please contact:
        </p>
        <div>
          <p className="block text-sm font-medium text-gray-800">
            {sender.email}
          </p>
          <p className="block text-sm font-medium text-gray-800">
            {sender.phone}
          </p>
        </div>
      </div>

      {/* Signature */}
      {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
        <div className="mt-6">
          <p className="font-semibold text-gray-800">Signature:</p>
          <img
            src={details.signature.data}
            width={120}
            height={60}
            alt={`Signature of ${sender.name}`}
          />
          <p className="text-sm text-gray-500">
            {sender.email} on behalf of {sender.name}
          </p>
        </div>
      ) : details.signature?.data ? (
        <div className="mt-6">
          <p className="text-gray-800">Signature:</p>
          <p
            style={{
              fontSize: 30,
              fontWeight: 400,
              fontFamily: `${details.signature.fontFamily}, cursive`,
              color: "black",
            }}
          >
            {details.signature.data}
          </p>
        </div>
      ) : null}
    </InvoiceLayout>
  );
};

export default InvoiceTemplate;
