"use client";

import { useState } from "react";

// ShadCn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Components
import { SavedInvoicesList } from "@/app/components";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { listInvoices, upsertInvoice } from "@/lib/store";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type InvoiceLoaderModalType = {
  children: React.ReactNode;
};

const InvoiceLoaderModal = ({ children }: InvoiceLoaderModalType) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { reset } = useFormContext();

  const { savedInvoices, setSavedInvoices } = useInvoiceContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  function handleUpload() {
    if (selectedFile && selectedFile.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = event.target?.result;

        try {
          const parsedData = JSON.parse(jsonData as string);
          reset(parsedData);
          upsertInvoice(
            username,
            parsedData.id ?? uuidv4(),
            parsedData.filename,
            parsedData.prefs
          );
          toast.success("Data loaded successfully");
        } catch (error) {
          toast.error("Error parsing JSON data");
          console.error("Error parsing JSON data:", error);
          console.error("JSON Data:", jsonData);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      console.log("Unsupported file type");
    }
    setSelectedFile(null);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Saved Invoices</DialogTitle>

          <DialogDescription>
            You have {savedInvoices.length} saved invoices
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="m-2"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <button
                className="m-2 button"
                onClick={() => {
                  listInvoices(username)
                    .then((invoices) => setSavedInvoices(invoices))
                    .catch((error) =>
                      console.error("Error getting invoices:", error)
                    );
                }}
              >
                Get Invoices
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div>
          <input type="file" onChange={handleFileChange} accept=".json" />
          <button onClick={handleUpload}>Load</button>
        </div>

        <SavedInvoicesList setModalState={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceLoaderModal;
