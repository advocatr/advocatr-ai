import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Exercise from "@/pages/exercise";
import Profile from "@/pages/profile";
import AdminExercises from "@/pages/admin/exercises";
import AdminProgress from "@/pages/admin/progress";
import AdminLayout from "@/components/admin-layout";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import LandingPage from "@/pages/landing-page"; // Added import for LandingPage

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function Router() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} /> {/* Ensure dashboard route exists */}
      <Route path="/exercise/:id" component={Exercise} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin/exercises">
        {() => <AdminRoute component={AdminExercises} />}
      </Route>
      <Route path="/admin/progress">
        {() => <AdminRoute component={AdminProgress} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;