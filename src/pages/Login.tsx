
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { toast } from 'sonner';

// Test user for demonstration
const TEST_USER = {
  email: 'demo@techstock.com',
  password: 'password123'
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  // Fondo negro base, el fondo animado lo pone <BackgroundPaths />
  const backgroundStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    background: '#000',
  };
  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Authentication simulation
    setTimeout(() => {
      if (isLogin) {
        // Login logic
        if (email === TEST_USER.email && password === TEST_USER.password) {
          // Successful login
          toast.success('Login successful');
          navigate('/dashboard');
        } else {
          // Failed login
          toast.error('Incorrect credentials. Use demo@techstock.com / password123');
        }
      } else {
        // Registration logic (always successful in demo)
        toast.success('Account created successfully. You can now log in.');
        setIsLogin(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear fields when changing mode
    setEmail('');
    setPassword('');
  };

  return (
    <div style={backgroundStyle}>
      <BackgroundPaths />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 shadow-xl">
          <CardHeader className="space-y-1 p-8 pb-2">
            <div className="flex flex-col items-center mb-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-20 h-20 mb-4 drop-shadow-lg select-none"
                draggable={false}
              />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-center text-gray-400 text-sm mt-2">
                {isLogin ? 'Sign in to access your account' : 'Create a new account'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500/50"
                    required
                  />
                </div>

              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  {isLogin && (
                    <Button variant="link" className="p-0 h-auto text-xs text-yellow-500 hover:text-yellow-400">
                      Forgot password?
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500/50"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/30 mt-4" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-8 pb-8 pt-4">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  {isLogin ? 'New to TechStock?' : 'Already have an account?'}
                </span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full bg-transparent text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-colors"
              onClick={toggleMode}
              type="button"
            >
              {isLogin ? 'Create an account' : 'Sign in instead'}
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>Demo credentials:</p>
              <p className="font-mono mt-1">demo@techstock.com / password123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
