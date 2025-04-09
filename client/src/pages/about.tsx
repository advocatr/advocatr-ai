
import { Layout } from "@/components/layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About Advocatr</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Advocatr is a comprehensive platform designed to help aspiring legal professionals master their advocacy skills through structured exercises and expert guidance.
          </p>
          <p className="text-lg">
            Our mission is to provide accessible, high-quality advocacy training that prepares students and practitioners for real-world legal scenarios.
          </p>
        </div>
      </div>
    </Layout>
  );
}
