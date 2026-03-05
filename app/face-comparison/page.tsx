'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FaceComparisonResult {
  similarity: number;
  status: 'match' | 'no_match';
  message: string;
}

export default function FaceComparisonPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [result, setResult] = useState<FaceComparisonResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulasi scanning face - 3 detik
    const scanTimer = setTimeout(() => {
      setIsScanning(false);
      // Simulasi delay sebelum menampilkan hasil
    }, 3000);

    // Simulasi hasil matching - 5 detik total (ALWAYS MATCH)
    const resultTimer = setTimeout(() => {
      const dummyResult: FaceComparisonResult = {
        similarity: Math.floor(Math.random() * (98 - 92 + 1)) + 92, // Random antara 92-98 (high score)
        status: 'match', // ALWAYS MATCH
        message: 'Face matched successfully'
      };
      setResult(dummyResult);
      setShowResult(true);
    }, 5000);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(resultTimer);
    };
  }, []);

  const handleBack = () => {
    sessionStorage.removeItem('verificationData');
    router.push('/');
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Face Verification</h1>

        {isScanning && (
          <>
            <p>Scanning biometric data...</p>
            <div className="face-scanning">
              <span className="face-text">📷</span>
            </div>
            <p className="loading-text" style={{ color: '#0f766e', textAlign: 'center', marginTop: '20px' }}>
              Matching... Please wait
            </p>
          </>
        )}

        {showResult && result && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <span className={`status-badge ${result.status === 'match' ? 'verified' : 'not-verified'}`}>
                {result.status === 'match' ? 'Match' : 'No Match'}
              </span>
            </div>

            <div className="similarity-score">
              <h2>Similarity Score</h2>
              <div className="similarity-percentage">{result.similarity}%</div>
              <div className="similarity-status">
                {result.message}
              </div>
            </div>

            {result.status === 'match' && (
              <div style={{
                background: '#d1fae5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 500,
              }}>
                Identity verification successful
              </div>
            )}

            {result.status === 'no_match' && (
              <div style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#7f1d1d',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 500,
              }}>
                Verification unsuccessful. Please try again.
              </div>
            )}

            <button className="back-btn" onClick={handleBack}>
              Back to Home
            </button>
          </>
        )}

        {!showResult && !isScanning && (
          <div style={{
            textAlign: 'center',
            color: '#0f766e',
            fontSize: '16px',
            marginTop: '30px'
          }}>
            Processing results...
          </div>
        )}
      </div>
    </div>
  );
}
