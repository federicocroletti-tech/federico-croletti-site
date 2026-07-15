export interface ContactFormValue {
  fullName: string;
  email: string;
  subject: string;
  requestType: string;
  message: string;
  privacyAccepted: boolean;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
