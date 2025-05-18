export class User {
  constructor(id, name, email, phone, password, isAdmin = false, isVerifiedOrganizer = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password; // This would be hashed in a real app
    this.isAdmin = isAdmin;
    this.isVerifiedOrganizer = isVerifiedOrganizer;
    this.createdAt = new Date();
  }
}