
import { Layout } from "@/components/layout";

export default function ContactUsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Get in touch with the Advocatr team for support or inquiries.
          </p>
        </div>
      </div>
    </Layout>
  );
}
