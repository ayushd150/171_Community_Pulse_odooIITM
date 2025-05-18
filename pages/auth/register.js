import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import RegisterForm from '../../components/auth/RegisterForm';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();
  const { redirect } = router.query;

  const handleRegister = async (userData) => {
    try {
      setError('');
      setLoading(true);
      
      const success = await register(userData);
      
      if (success) {
        // Redirect to the specified page or to homepage
        router.push(redirect || '/');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message.includes('Email already exists')) {
        setError('This email is already registered. Please use a different email or login.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Create Account - Community Pulse</title>
        <meta name="description" content="Create a new account on Community Pulse" />
      </Head>

      <div className="flex min-h-screen-content items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="mt-2 text-gray-600">
              Join Community Pulse to discover and create local events
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <RegisterForm onSubmit={handleRegister} loading={loading} />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href={{
                  pathname: '/auth/login',
                  query: redirect ? { redirect } : {}
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Log in
              </Link>
            </p>
            
            <Link 
              href="/"
              className="block mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}