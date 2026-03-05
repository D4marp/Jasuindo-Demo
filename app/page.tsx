'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';

type VerificationMethod = 'nik' | 'email' | 'qr' | null;

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>(null);
  const [nikInput, setNikInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  // Generate QR code otomatis ketika method QR dipilih
  useEffect(() => {
    if (selectedMethod === 'qr') {
      generateQRCode();
    }
  }, [selectedMethod]);

  // Generate QR code ke canvas
  useEffect(() => {
    if (qrValue && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrValue, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 200,
      }, (error) => {
        if (error) console.error('Error generating QR code:', error);
      });
    }
  }, [qrValue]);

  const generateQRCode = () => {
    // Generate random QR value dengan timestamp
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 15);
    const qrData = `IDENTITY_VERIFY_${timestamp}_${randomId}`;
    setQrValue(qrData);
  };

  const handleVerify = async () => {
    if (!selectedMethod) {
      alert('Pilih metode verifikasi terlebih dahulu');
      return;
    }

    if (selectedMethod === 'nik' && !nikInput.trim()) {
      alert('Masukkan NIK');
      return;
    }

    if (selectedMethod === 'email' && !emailInput.trim()) {
      alert('Masukkan Email');
      return;
    }

    if (selectedMethod === 'qr' && !qrValue) {
      alert('Generate QR Code terlebih dahulu');
      return;
    }

    setIsLoading(true);

    // Simulasi delay proses
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Prepare data untuk dikirim
    const verificationData = {
      method: selectedMethod,
      nik: selectedMethod === 'nik' ? nikInput : '',
      email: selectedMethod === 'email' ? emailInput : '',
      qrCode: selectedMethod === 'qr' ? qrValue : '',
    };

    // Simpan ke sessionStorage untuk diakses di halaman result
    sessionStorage.setItem('verificationData', JSON.stringify(verificationData));

    router.push('/result');
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Identity Verification</h1>
        <p>Select verification method to proceed</p>

        <div className="method-selector">
          <button
            className={`method-btn ${selectedMethod === 'nik' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('nik')}
          >
            National Identity Number (NIK)
          </button>
          <button
            className={`method-btn ${selectedMethod === 'email' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('email')}
          >
            Email Address
          </button>
          <button
            className={`method-btn ${selectedMethod === 'qr' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('qr')}
          >
            QR Code Verification
          </button>
        </div>

        {/* Input NIK */}
        {selectedMethod === 'nik' && (
          <div className="input-group">
            <label htmlFor="nik">Nomor Identitas Kependudukan (NIK)</label>
            <input
              id="nik"
              type="text"
              placeholder="Enter 16-digit NIK"
              value={nikInput}
              onChange={(e) => setNikInput(e.target.value.replace(/\D/g, '').slice(0, 16))}
              maxLength={16}
            />
            <small>Test with: 1234567890123456</small>
          </div>
        )}

        {/* Input Email */}
        {selectedMethod === 'email' && (
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <small>Test with: user@example.com</small>
          </div>
        )}

        {/* QR Code */}
        {selectedMethod === 'qr' && (
          <div className="qr-container">
            <div className="qr-header">
              <h3>QR Code Verification</h3>
              <p>Scan or use this QR code for verification</p>
            </div>

            {qrValue && (
              <div className="qr-code-wrapper">
                <canvas
                  ref={canvasRef}
                  style={{
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </div>
            )}

            <div className="qr-info">
              <strong>QR ID:</strong>
              <code style={{ fontSize: '11px', wordBreak: 'break-all' }}>
                {qrValue ? qrValue.substring(0, 30) + '...' : 'Generating...'}
              </code>
            </div>

            <button
              className="regenerate-qr-btn"
              onClick={generateQRCode}
              type="button"
            >
              Generate New QR Code
            </button>
          </div>
        )}

        <button
          className="verify-btn"
          onClick={handleVerify}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Processing...' : 'Verify Identity'}
        </button>
      </div>
    </div>
  );
}
