import React, { useState } from 'react';
import { useRouter } from 'next/router';

const EventForm = ({ initialData, onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    address: initialData?.location?.address || '',
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
    startTime: initialData?.startDate ? new Date(initialData.startDate).toTimeString().split(' ')[0].substring(0, 5) : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
    endTime: initialData?.endDate ? new Date(initialData.endDate).toTimeString().split(' ')[0].substring(0, 5) : '',
    category: initialData?.category || '',
    registrationStart: initialData?.registrationStart ? new Date(initialData.registrationStart).toISOString().split('T')[0] : '',
    registrationEnd: initialData?.registrationEnd ? new Date(initialData.registrationEnd).toISOString().split('T')[0] : '',
    images: initialData?.images || [],
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      // In a real app, you would upload the file to a storage service
      // and get back a URL. For this example, we'll create object URLs
      const newImages = [...formData.images];
      for (let i = 0; i < files.length; i++) {
        // This is just for demo purposes - in a real app you'd upload to a server
        const objectUrl = URL.createObjectURL(files[i]);
        newImages.push(objectUrl);
      }
      setFormData((prev) => ({ ...prev, images: newImages }));
    } catch (err) {
      setError('Failed to upload images');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.address || 
        !formData.startDate || !formData.startTime || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Combine date and time fields
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = formData.endDate && formData.endTime 
        ? new Date(`${formData.endDate}T${formData.endTime}`) 
        : null;
      
      // Prepare location data (in a real app, you would geocode the address here)
      const location = {
        address: formData.address,
        coordinates: { lat: 0, lng: 0 } // Placeholder for geocoded coordinates
      };

      // Prepare the event data
      const eventData = {
        ...initialData,
        title: formData.title,
        description: formData.description,
        location,
        startDate: startDateTime,
        endDate: endDateTime,
        category: formData.category,
        registrationStart: formData.registrationStart ? new Date(formData.registrationStart) : null,
        registrationEnd: formData.registrationEnd ? new Date(formData.registrationEnd) : null,
        images: formData.images,
      };

      await onSubmit(eventData);
      router.push(initialData ? `/events/${initialData.id}` : '/user/events');
    } catch (err) {
      setError('Failed to save event');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Event Name*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Location*
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date*
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time*
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category*
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          required
        >
          <option value="">Select a category</option>
          <option value="Garage Sales">Garage Sales</option>
          <option value="Sports Matches">Sports Matches</option>
          <option value="Community Classes">Community Classes</option>
          <option value="Volunteer Opportunities">Volunteer Opportunities</option>
          <option value="Exhibitions">Exhibitions</option>
          <option value="Festivals">Festivals</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="registrationStart" className="block text-sm font-medium text-gray-700">
            Registration Start Date
          </label>
          <input
            type="date"
            id="registrationStart"
            name="registrationStart"
            value={formData.registrationStart}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="registrationEnd" className="block text-sm font-medium text-gray-700">
            Registration End Date
          </label>
          <input
            type="date"
            id="registrationEnd"
            name="registrationEnd"
            value={formData.registrationEnd}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photos</label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {uploading && <span className="ml-3 text-sm text-gray-500">Uploading...</span>}
        </div>
        {formData.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative h-24 w-24 rounded overflow-hidden">
                <Image src={img} alt="Preview" layout="fill" objectFit="cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          {initialData ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;