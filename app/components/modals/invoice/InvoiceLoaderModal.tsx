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
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

type InvoiceLoaderModalType = {
  children: React.ReactNode;
};

const InvoiceLoaderModal = ({ children }: InvoiceLoaderModalType) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { reset } = useFormContext();

  const { savedInvoices } = useInvoiceContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  function handleUpload() {
    // Process the selected file JSON here
    if (selectedFile && selectedFile.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = event.target?.result;
        // Your JSON processing logic here
        console.log("JSON Data:", jsonData);
        try {
          const parsedData = JSON.parse(jsonData as string);
          reset(parsedData);
          toast.success("Data loaded successfully");
        } catch (error) {
          toast.error("Error parsing JSON data");
          console.log("Error parsing JSON data:", error);
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
