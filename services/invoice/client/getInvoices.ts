// Variables
import { INVOICE_API } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

/**
 * Fetch a list of invoices for a specific user from the server.
 *
 * @param {string} username - The username to fetch invoices for.
 * @throws {Error} If there is an error during the fetching process.
 * @returns {Promise<InvoiceType[]>} A promise that resolves with the list of fetched invoices.
 */
export const getInvoices = async (username: string): Promise<InvoiceType[]> => {
  if (!username) {
    throw new Error("Username is required to fetch invoices.");
  }

  return fetch(`${INVOICE_API}?username=${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch invoices. Please try again later.");
      }
      return response.json();
    })
    .then((data: InvoiceType[]) => data)
    .catch((error) => {
      console.error("Error fetching invoices:", error);
      throw new Error(
        "Error fetching invoices. Please check the console for more details."
      );
    });
};
