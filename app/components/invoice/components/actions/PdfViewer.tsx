import { useMemo } from "react";

// ShadCn components
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Components
import { BaseButton, SendPdfToEmailModal } from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/app/contexts/InvoiceContext";

// Icons
import { Download, Eye, Mail, Printer, Save } from "lucide-react";

type PdfViewerProps = {
    pdfBlob: Blob;
};

const PdfViewer = ({ pdfBlob }: PdfViewerProps) => {
    const {
        previewPdfInTab,
        downloadPdf,
        printPdf,
        saveInvoice,
        sendPdfToMail,
    } = useInvoiceContext();

    const pdfUrl = useMemo(() => {
        return window.URL.createObjectURL(pdfBlob);
    }, [pdfBlob]);
    return (
        <div className="my-5">
            <p className="text-xl font-semibold">PDF View</p>
            <div className="flex flex-wrap gap-x-2 py-1">
                <BaseButton
                    tooltipLabel="Preview invoice in new tab"
                    onClick={previewPdfInTab}
                    size="icon"
                    variant={"outline"}
                >
                    <Eye />
                </BaseButton>
                <BaseButton
                    tooltipLabel="Download invoice PDF"
                    onClick={downloadPdf}
                    size="icon"
                    variant={"outline"}
                >
                    <Download />
                </BaseButton>

                <BaseButton
                    tooltipLabel="Print invoice"
                    onClick={printPdf}
                    size="icon"
                    variant={"outline"}
                >
                    <Printer />
                </BaseButton>

                <BaseButton
                    tooltipLabel="Save invoice in website"
                    onClick={saveInvoice}
                    size="icon"
                    variant={"outline"}
                >
                    <Save />
                </BaseButton>

                <SendPdfToEmailModal sendPdfToMail={sendPdfToMail}>
                    <BaseButton
                        tooltipLabel="Send invoice PDF to mail"
                        size="icon"
                        variant={"outline"}
                    >
                        <Mail />
                    </BaseButton>
                </SendPdfToEmailModal>
            </div>
            <AspectRatio ratio={1 / 1.4}>
                <iframe
                    className="h-full w-full"
                    src={`${pdfUrl}#toolbar=0`}
                ></iframe>
            </AspectRatio>
        </div>
    );
};

export default PdfViewer;
