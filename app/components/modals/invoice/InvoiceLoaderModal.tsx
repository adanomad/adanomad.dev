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

type InvoiceLoaderModalType = {
    children: React.ReactNode;
};

const InvoiceLoaderModal = ({ children }: InvoiceLoaderModalType) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { savedInvoices } = useInvoiceContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleUpload = () => {
        // Process the selected file (JSON, CSV, XML, XLSX) here
        // You can use libraries like papaparse for CSV, xml2js for XML, etc.
        // Example: Parse CSV file
        // if (selectedFile && selectedFile.type === 'text/csv') {
        //     // Your CSV processing logic here
        // }

        // Add your logic to handle different file types
        // ...

        // Close the modal after processing
        setOpen(false);
    };

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
                    <input type="file" onChange={handleFileChange} accept=".json, .csv, .xml, .xlsx" />
                    <button onClick={handleUpload}>Upload</button>
                </div>

                <SavedInvoicesList setModalState={setOpen} />
            </DialogContent>
        </Dialog>
    );

};

export default InvoiceLoaderModal;
