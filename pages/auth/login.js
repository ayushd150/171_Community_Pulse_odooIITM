export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { redirect } = router.query;

  const handleLogin = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      const success = await login(email, password);
      
      if (success) {
        // Redirect to the specified page or to homepage
        router.push(redirect || '/');
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Log In - Community Pulse</title>
        <meta name="description" content="Log in to your Community Pulse account" />
      </Head>

      <div className="flex min-h-screen-content items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-gray-600">
              Log in to continue to Community Pulse
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleLogin} loading={loading} />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link 
                href={{
                  pathname: '/auth/register',
                  query: redirect ? { redirect } : {}
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
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