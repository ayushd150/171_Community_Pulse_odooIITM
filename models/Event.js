export class Event {
  constructor(
    id,
    title,
    description,
    location,
    startDate,
    endDate,
    category,
    organizerId,
    images = [],
    isApproved = false,
    registrationStart = null,
    registrationEnd = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location; // { address, coordinates: { lat, lng } }
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = category;
    this.organizerId = organizerId;
    this.images = images;
    this.isApproved = isApproved;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
