export function PrivacySection() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Our Privacy Policy outlines how we collect, use, and protect your personal information.
      </p>
      <div className="prose prose-sm max-w-none">
        <h3>Data Collection</h3>
        <p>
          We collect information that you provide directly to us, including but not limited to:
          account information, usage data, and communication preferences.
        </p>
        
        <h3>Data Usage</h3>
        <p>
          We use your information to provide and improve our services, communicate with you,
          and ensure a personalized experience.
        </p>
        
        <h3>Data Protection</h3>
        <p>
          We implement appropriate security measures to protect your personal information
          against unauthorized access or disclosure.
        </p>
      </div>
    </div>
  );
}