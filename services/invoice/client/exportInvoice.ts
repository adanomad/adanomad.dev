// Variables
import { EXPORT_INVOICE_API } from "@/lib/variables";

// Types
import { ExportTypes, InvoiceType } from "@/types";

/**
 * Export an invoice by sending a POST request to the server and initiating the download.
 *
 * @param {ExportTypes} exportAs - The format in which to export the invoice (e.g., JSON, CSV).
 * @param {InvoiceType} formValues - The invoice form data to be exported.
 * @param {string} [email] - The email address to send the exported invoice to (optional).
 * @param {string} [filename] - The filename for the exported invoice (optional).
 * @throws {Error} If there is an error during the export process.
 * @returns {Promise<void>} A promise that resolves when the export is completed.
 */

export const exportInvoice = async (
  exportAs: ExportTypes,
  formValues: InvoiceType,
  username?: string,
  filename?: string
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("format", exportAs);
  if (username) {
    queryParams.set("username", username);
  }
  if (filename) {
    queryParams.set("filename", filename);
  }

  return fetch(`${EXPORT_INVOICE_API}?${queryParams.toString()}`, {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice.${exportAs.toLowerCase()}`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading:", error);
    });
};
