import { kv } from "@vercel/kv";

type Invoice = {
  filename: string;
  prefs: Record<string, any>;
};

type UserInvoices = {
  invoices: string[];
};

/**
 * Retrieves an invoice from the key-value store.
 * @param invoiceId - The ID of the invoice to retrieve.
 * @returns A Promise that resolves to the retrieved invoice, or an empty object if not found.
 */
export async function getInvoice(invoiceId: string): Promise<Invoice> {
  const invoice = await kv.get<Invoice>(`invoice:${invoiceId}`);
  return invoice || { filename: "", prefs: {} };
}

/**
 * Upserts an invoice into the database and sets the preferences for the invoice.
 * If the invoice already exists, it updates the preferences.
 *
 * @param email - The email associated with the invoice.
 * @param invoiceId - The ID of the invoice.
 * @param filename - The filename of the invoice.
 * @param prefs - The preferences for the invoice.
 * @returns A promise that resolves to true if the upsert is successful, or false otherwise.
 */
export async function upsertInvoice(
  email: string,
  invoiceId: string,
  filename: string,
  prefs: Record<string, any>
): Promise<boolean> {
  try {
    // Upsert invoice details
    await kv.set(`invoice:${invoiceId}`, { filename, prefs });

    // Retrieve the current list of invoices for the user, if exists
    const userInvoices = await kv.get<UserInvoices>(`user:${email}:invoices`);
    const invoices = userInvoices ? userInvoices.invoices : [];

    // Add the new invoiceId to the user's list of invoices if it's not already present
    if (!invoices.includes(invoiceId)) {
      invoices.push(invoiceId);
      await kv.set(`user:${email}:invoices`, { invoices });
    }

    return true;
  } catch (error) {
    console.error("Error upserting invoice:", error);
    return false;
  }
}

/**
 * Retrieves a list of invoices for a given email.
 * @param email - The email for which to retrieve the invoices.
 * @returns A promise that resolves to an array of invoices.
 */
export async function listInvoices(email: string): Promise<Invoice[]> {
  try {
    const userInvoices = await kv.get<UserInvoices>(`user:${email}:invoices`);
    if (!userInvoices || userInvoices.invoices.length === 0) {
      return [];
    }

    const invoices = await Promise.all(
      userInvoices.invoices.map(async (invoiceId) => {
        return getInvoice(invoiceId);
      })
    );

    return invoices;
  } catch (error) {
    console.error("Error listing invoices:", error);
    return [];
  }
}
