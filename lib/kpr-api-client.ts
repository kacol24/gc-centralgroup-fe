// Types
export interface OtpRequestResponse {
  requestOtp: {
    validUntil: string;
    message: string;
  };
}

export interface OtpVerifyResponse {
  verifyOtp: {
    status: boolean;
    message: string;
  };
}

export interface RaffleSubmissionResponse {
  submitRaffle: {
    status: boolean;
    serialNumber: string;
    submitAt: string;
  };
}

export interface RaffleSubmissionInput {
  name: string;
  email: string;
  phone: string;
  nik: string;
  source: string;
  friends: Array<{
    name: string;
    phone: string;
  }>;
}

// API functions using internal API routes
export async function requestOtp(email: string): Promise<OtpRequestResponse> {
  const response = await fetch('/api/kpr-otp/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to request OTP');
  }

  return response.json();
}

export async function verifyOtp(otp: string, email: string): Promise<OtpVerifyResponse> {
  const response = await fetch('/api/kpr-otp/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ otp, email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to verify OTP');
  }

  return response.json();
}

export async function submitRaffle(submission: RaffleSubmissionInput): Promise<RaffleSubmissionResponse> {
  const response = await fetch('/api/kpr-raffle/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ submission }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit raffle');
  }

  return response.json();
}
