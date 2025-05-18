import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import EventList from '../components/events/EventList';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Get user's location for nearby events if permitted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.error("Error getting location: ", err);
        }
      );
    }

    // Fetch featured/recent events
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events?featured=true&limit=6');
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewNearbyEvents = () => {
    if (location) {
      router.push(`/events?lat=${location.lat}&lng=${location.lng}`);
    } else {
      router.push('/events');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Community Pulse | Connect with Local Events</title>
        <meta name="description" content="Discover and join community events near you" />
      </Head>

      <div className="bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Connect with Your Community</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover local events, meet new people, and make a difference in your community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleViewNearbyEvents} className="px-8 py-3">
              Find Events Near Me
            </Button>
            {!user && (
              <Link href="/auth/register" legacyBehavior>
                <Button variant="outline" className="px-8 py-3">
                  Create Account
                </Button>
              </Link>
            )}
            {user && (
              <Link href="/events/new" legacyBehavior>
                <Button variant="outline" className="px-8 py-3">
                  Create Event
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
          <Link href="/events" legacyBehavior>
            <a className="text-blue-600 hover:text-blue-800 font-medium">View all events</a>
          </Link>
        </div>
        
        {loading && <p className="text-center py-8">Loading events...</p>}
        {error && <p className="text-center text-red-500 py-8">Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="text-center py-8">No featured events available at the moment.</p>
        )}
        {!loading && !error && events.length > 0 && <EventList events={events} />}
      </div>

      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the Community Pulse platform to discover, create, and participate in local events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl font-bold mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">Find Events</h3>
              <p className="text-gray-600">Discover events happening in your area based on your interests and location.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl font-bold mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">Register & Attend</h3>
              <p className="text-gray-600">Sign up for events you're interested in and connect with the organizers and attendees.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl font-bold mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">Create & Host</h3>
              <p className="text-gray-600">Have an idea? Create your own event and invite the community to participate.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}