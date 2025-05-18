export class Registration {
  constructor(id, eventId, userId, name, email, phone, attendeeCount) {
    this.id = id;
    this.eventId = eventId;
    this.userId = userId; // Can be null for non-registered users
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.attendeeCount = attendeeCount;
    this.registeredAt = new Date();
  }
}