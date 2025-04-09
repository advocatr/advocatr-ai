import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, BookOpen, Users, Award, User, LogOut } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Logo size="lg" />
            <h1 className="text-2xl font-bold">Advocatr</h1>
          </div>
          <div className="flex gap-4">
            {user ? (
              <>
                <Button variant="outline" onClick={() => setLocation("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Button>
                <Button onClick={() => setLocation("/dashboard")}>
                  Exercises
                </Button>
                <Button variant="outline" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setLocation("/auth")}>
                  Sign In
                </Button>
                <Button onClick={() => setLocation("/auth")}>Get Started</Button>
              </>
            )}
          </div>
        </header>

        <main>
          <section className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6">
              Master Advocacy Skills with Expert Guidance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Advocatr provides structured exercises and feedback to help you
              develop essential advocacy skills for pupillage interview practice
              and beyond.
            </p>
            <Button
              size="lg"
              onClick={() => setLocation("/auth")}
              className="px-8 py-6 text-lg"
            >
              Start Your Journey <ArrowRight className="ml-2" />
            </Button>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mb-20">
            <Card>
              <CardContent className="pt-6">
                <BookOpen className="h-10 w-10 mb-4 text-primary" />
                <h2 className="text-xl font-bold mb-2">Practical Exercises</h2>
                <p className="text-gray-600">
                  Learn through a series of progressive exercises designed by
                  legal professionals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="h-10 w-10 mb-4 text-primary" />
                <h2 className="text-xl font-bold mb-2">Expert Demos</h2>
                <p className="text-gray-600">
                  Watch demonstrations from experienced advocates to understand
                  best practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Award className="h-10 w-10 mb-4 text-primary" />
                <h2 className="text-xl font-bold mb-2">
                  Professional Feedback
                </h2>
                <p className="text-gray-600">
                  Receive detailed feedback on your submissions to improve your
                  skills.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Improve Your Advocacy Skills?
            </h2>
            <Button
              size="lg"
              onClick={() => setLocation("/auth")}
              className="px-8 py-6 text-lg"
            >
              Begin Now <ArrowRight className="ml-2" />
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-500 mt-20">
          <p>© {new Date().getFullYear()} Advocatr. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
