export interface Ticket {
    id: number,
    description: string,
    content: string
}

export const tickets: Ticket[] = [
    {
        id: 1,
        description: "User account locked",
        content: "Customer ID 2039485 reported that their account is locked after multiple failed login attempts. Please verify and unlock the account if appropriate."
    },
    {
        id: 2,
        description: "Payment reconciliation issue",
        content: "Discrepancy found in payment records for invoice INV-5723. The system shows it as paid, but the bank transfer hasn’t cleared. Investigate and confirm transaction status."
    },
    {
        id: 3,
        description: "Incorrect user role assignment",
        content: "User John Doe (ID 382910) was mistakenly assigned an Admin role. Please review the permissions and revert to the standard user role if needed."
    },
    {
        id: 4,
        description: "Data export request",
        content: "Operations team needs a full export of transactions from July 1 to July 31 for audit purposes. Format required: CSV. Include payment status and timestamps."
    },
    {
        id: 5,
        description: "Failed system integration",
        content: "The nightly sync between CRM and finance systems failed on 08/07/2025. Error code: SYNC-502. Please investigate and retry the job."
    },
    {
        id: 6,
        description: "Manual override for inventory adjustment",
        content: "Warehouse team reported a mismatch in stock levels for product SKU-8823. Backoffice approval needed for manual stock adjustment in the system."
    },
    {
        id: 7,
        description: "Duplicate invoice generated",
        content: "Customer #584201 received two invoices for the same service period. Review invoice numbers INV-8841 and INV-8842. One must be voided."
    },
    {
        id: 8,
        description: "Request to anonymize user data",
        content: "Under GDPR request, user Jane Smith (ID 774920) has requested complete data anonymization. Confirm identity and proceed with data purge workflow."
    },
    {
        id: 9,
        description: "Tax rate update required",
        content: "Due to policy changes, the VAT rate for EU customers must be updated from 19% to 21% starting August 1st. Update system configuration accordingly."
    },
    {
        id: 10,
        description: "Refund approval needed",
        content: "Customer #382910 is requesting a refund for order ORD-11921 due to a duplicate charge. Please review transaction logs and approve if valid."
    }
];