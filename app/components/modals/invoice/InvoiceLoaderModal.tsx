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
import { ToastContainer, toast } from 'react-toastify';

type InvoiceLoaderModalType = {
    children: React.ReactNode;
};

const InvoiceLoaderModal = ({ children }: InvoiceLoaderModalType) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { savedInvoices } = useInvoiceContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    function handleUpload() {
        // Process the selected file JSON here
         if (selectedFile && selectedFile.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const jsonData = event.target?.result;
                // Your JSON processing logic here
                console.log("JSON Data:", jsonData);
            };
            reader.readAsText(selectedFile);
        } else {
            console.log("Unsupported file type");
        }
        // Toast the upload status
        if (selectedFile) {
            // Show a toast message indicating the upload status
            const toastMessage = `Uploading ${selectedFile.name}...`;
            toast(toastMessage);

            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    // Show a toast message indicating the upload is complete
                    const toastMessage = `${selectedFile.name} uploaded successfully!`;
                    toast(toastMessage);
                }
            }, 500);
        }
        // Close the modal after processing
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
                    <button onClick={handleUpload}>Upload</button>
                    {selectedFile && (
                        <div>
                            <progress value={uploadProgress} max={100} />
                            <span>{uploadProgress}%</span>
                        </div>
                    )}
                </div>

                <SavedInvoicesList setModalState={setOpen} />
            </DialogContent>
        </Dialog>
    );

};

export default InvoiceLoaderModal;
