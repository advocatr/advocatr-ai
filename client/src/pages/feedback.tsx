
import { Layout } from "@/components/layout";

export default function FeedbackPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Feedback</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Share your thoughts and suggestions to help us improve Advocatr.
          </p>
        </div>
      </div>
    </Layout>
  );
}
