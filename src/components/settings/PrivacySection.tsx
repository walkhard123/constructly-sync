export function PrivacySection() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        At Probuilder, we are committed to protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our project management software and related services ("Services").
      </p>
      <div className="prose prose-sm max-w-none space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Collection of Personal Information</h3>
          <p>
            We collect personal information that is necessary to provide our Services. The types of personal information we may collect include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account Information: Information that you provide when registering for an account, such as your name, email address, job title, company name, and other account-related details.</li>
            <li>Usage Data: Information about how you interact with our Services, including but not limited to: your IP address, browser type, device information, location data, pages visited, and other usage statistics.</li>
            <li>Communication Data: Any information you provide in communications with us, such as through customer support inquiries, feedback, or any other forms of correspondence.</li>
            <li>Payment Information: If you subscribe to paid features of our Services, we may collect payment details, such as billing address and payment method (processed through third-party payment processors).</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Purpose of Data Collection</h3>
          <p>We collect and use your personal information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provision of Services: To provide, operate, and maintain our Services, including setting up and managing your account, processing transactions, and delivering requested features or services.</li>
            <li>Improvement and Customisation: To improve our Services, enhance user experience, and provide personalised content and recommendations based on your usage patterns and preferences.</li>
            <li>Communication: To communicate with you regarding updates to our Services, technical support, marketing communications, and responses to your inquiries.</li>
            <li>Legal Compliance: To comply with legal obligations, resolve disputes, enforce our agreements, and protect the rights and safety of our users, employees, and others.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Data Security</h3>
          <p>We are committed to protecting your personal information. We implement a range of security measures including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption: Use of encryption technologies to protect sensitive data transmitted over the internet.</li>
            <li>Access Controls: Restricting access to your personal data to authorised personnel only, on a need-to-know basis.</li>
            <li>Monitoring: Regular monitoring and auditing of our systems to detect and prevent unauthorised access.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Your Rights and Choices</h3>
          <p>Under the Privacy Act 1988, you have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access: You can request access to the personal information we hold about you.</li>
            <li>Correction: You can request correction of any inaccurate or incomplete personal information.</li>
            <li>Deletion: You can request the deletion of your personal information in certain circumstances.</li>
            <li>Opt-out: You can opt out of receiving marketing communications.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Changes to Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or to comply with legal requirements. 
            We will notify you of any material changes by posting an updated version on our website and indicating the effective date.
          </p>
        </div>
      </div>
    </div>
  );
}