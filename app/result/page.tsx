'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface VerificationData {
  method: string;
  nik: string;
  email: string;
  qrCode: string;
}

interface VerificationResult {
  status: 'verified' | 'not_verified';
  name?: string;
  nik?: string;
  email?: string;
  identityStatus?: string;
  reason?: string;
  timestamp: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulasi delay untuk mengambil data dari session
    const timer = setTimeout(() => {
      const dataStr = sessionStorage.getItem('verificationData');
      if (!dataStr) {
        router.push('/');
        return;
      }

      const data: VerificationData = JSON.parse(dataStr);
      const verificationResult = checkVerification(data);
      setResult(verificationResult);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  const checkVerification = (data: VerificationData): VerificationResult => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Dummy Logic - Multiple test credentials all return VERIFIED
    if (data.method === 'nik') {
      // All NIK examples return verified
      const validNIKs: { [key: string]: { name: string; status: string } } = {
        '1234567890123456': { name: 'John Doe', status: 'Active' },
        '3275123456789012': { name: 'Budi Santoso', status: 'Active' },
        '5109876543210123': { name: 'Siti Nurhaliza', status: 'Active' },
        '3514567890123456': { name: 'Ahmad Wijaya', status: 'Active' },
        '1234567890000001': { name: 'Sarah Johnson', status: 'Active' },
      };

      const nikData = validNIKs[data.nik];
      if (nikData) {
        return {
          status: 'verified',
          name: nikData.name,
          nik: data.nik,
          identityStatus: nikData.status,
          timestamp: timeString
        };
      } else {
        return {
          status: 'verified', // Changed to verified for demo
          name: 'Test User',
          nik: data.nik,
          identityStatus: 'Active',
          timestamp: timeString
        };
      }
    }

    if (data.method === 'email') {
      // All valid email formats return verified
      const validEmails: { [key: string]: { name: string; status: string } } = {
        'user@example.com': { name: 'Jane Smith', status: 'Active' },
        'john.doe@company.com': { name: 'John Corporate', status: 'Active' },
        'admin@verification.io': { name: 'Admin User', status: 'Active' },
        'test@email.com': { name: 'Test Account', status: 'Active' },
        'demo@system.dev': { name: 'Demo System', status: 'Active' },
      };

      const emailData = validEmails[data.email];
      if (emailData) {
        return {
          status: 'verified',
          name: emailData.name,
          email: data.email,
          identityStatus: emailData.status,
          timestamp: timeString
        };
      } else {
        // Also verified for any valid email format
        return {
          status: 'verified',
          name: 'Verified User',
          email: data.email,
          identityStatus: 'Active',
          timestamp: timeString
        };
      }
    }

    if (data.method === 'qr') {
      return {
        status: 'verified',
        name: 'Muhammad Ali',
        nik: '357803xxxxxxxx',
        identityStatus: 'Active',
        timestamp: timeString
      };
    }

    return {
      status: 'verified', // Default to verified for demo
      name: 'Verified User',
      identityStatus: 'Active',
      timestamp: timeString
    };
  };

  const handleContinue = () => {
    if (result?.status === 'verified') {
      router.push('/face-comparison');
    } else {
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">
            Verifying identity information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Verification Result</h1>

        {result && (
          <>
            <div className={`status-badge ${result.status === 'verified' ? 'verified' : 'not-verified'}`}>
              {result.status === 'verified' ? 'Verified' : 'Not Verified'}
            </div>

            {result.status === 'verified' && (
              <div className="result-info">
                <div className="result-info-row">
                  <span className="result-info-label">Full Name</span>
                  <span className="result-info-value">{result.name}</span>
                </div>
                {result.nik && (
                  <div className="result-info-row">
                    <span className="result-info-label">NIK</span>
                    <span className="result-info-value">{result.nik}</span>
                  </div>
                )}
                {result.email && (
                  <div className="result-info-row">
                    <span className="result-info-label">Email</span>
                    <span className="result-info-value">{result.email}</span>
                  </div>
                )}
                <div className="result-info-row">
                  <span className="result-info-label">Status</span>
                  <span className="result-info-value">{result.identityStatus}</span>
                </div>
                <div className="result-info-row">
                  <span className="result-info-label">Timestamp</span>
                  <span className="result-info-value">{result.timestamp}</span>
                </div>
              </div>
            )}

            {result.status === 'not_verified' && (
              <div className="result-info">
                <div className="result-info-row">
                  <span className="result-info-label">Reason</span>
                  <span className="result-info-value">{result.reason}</span>
                </div>
                <div className="result-info-row">
                  <span className="result-info-label">Timestamp</span>
                  <span className="result-info-value">{result.timestamp}</span>
                </div>
              </div>
            )}

            <button className="verify-btn" onClick={handleContinue}>
              {result.status === 'verified' ? 'Proceed to Face Verification' : 'Back to Verification'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
