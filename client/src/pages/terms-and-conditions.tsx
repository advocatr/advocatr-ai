
import { Layout } from "@/components/layout";

export default function TermsAndConditionsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Please review our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </Layout>
  );
}
